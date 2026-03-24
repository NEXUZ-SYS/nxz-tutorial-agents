---
name: chatwoot-publish
description: >
  Publish Markdown articles with images to Chatwoot Help Center via API.
  Handles portal/category selection, image upload, article creation with
  hosted image URLs, and verification. Use when a squad pipeline needs
  to publish its final output to Chatwoot.
description_pt-BR: >
  Publica artigos Markdown com imagens no Help Center do Chatwoot via API.
  Gerencia selecao de portal/categoria, upload de imagens, criacao de artigos
  com URLs das imagens hospedadas e verificacao. Use quando o pipeline de
  uma squad precisar publicar o output final no Chatwoot.
type: prompt
version: 2.0.0
categories: [publishing, documentation, help-center, chatwoot]
env:
  - CHATWOOT_BASE_URL
  - CHATWOOT_API_TOKEN
  - CHATWOOT_ACCOUNT_ID
---

# Chatwoot Help Center Publisher

## When to use

Use this skill when the pipeline needs to publish a final document (tutorial, article, guide) to a Chatwoot Help Center portal, especially when the document contains local image files that need to be embedded.

## Prerequisites Check

Before publishing, verify the environment variables are configured in the project `.env` file:

```bash
source .env 2>/dev/null
echo "BASE_URL: ${CHATWOOT_BASE_URL:-NOT SET}"
echo "TOKEN: ${CHATWOOT_API_TOKEN:+OK}"
echo "ACCOUNT: ${CHATWOOT_ACCOUNT_ID:-NOT SET}"
```

If any variable is missing:
- Inform the user which variables are missing
- Guide them: "Add these to your `.env` file:
  ```
  CHATWOOT_BASE_URL=https://your-chatwoot-instance.com
  CHATWOOT_API_TOKEN=your_api_access_token
  CHATWOOT_ACCOUNT_ID=1
  ```
  The API token is found in Chatwoot > Settings > Profile > Access Token."
- Do NOT proceed until all three are configured.

After loading, store them for use in all subsequent API calls:
```bash
source .env
```

## API Request Rules

1. **All API endpoints require `accounts/{id}` in the path.** The pattern is always:
   ```
   $CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/...
   ```
   Endpoints without the account ID (e.g., `/api/v1/portals`) return 404.

2. **Always use `rtk proxy curl`** for API calls that return JSON you need to parse. The RTK CLI proxy filters JSON values for token savings, making responses unparseable. `rtk proxy` bypasses this filtering and returns raw JSON.

3. **Use `node -e` for JSON parsing** when you can't use `rtk proxy`. Never use `python3 -m json.tool` — it fails on RTK-filtered output.

4. **Authentication:** All API calls use the header `api_access_token: $CHATWOOT_API_TOKEN`.

## Publishing Flow

### Step 1: Discover the author ID

Fetch the current user profile to get the author ID:

```bash
source .env && rtk proxy curl -s -H "api_access_token: $CHATWOOT_API_TOKEN" \
  "$CHATWOOT_BASE_URL/api/v1/profile" | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const p=JSON.parse(d);
  console.log("Author ID:", p.id, "| Name:", p.name);
})'
```

Extract `id` from the response — this is the `author_id` for article creation.

### Step 2: Select the portal

List available portals:

```bash
rtk proxy curl -s -H "api_access_token: $CHATWOOT_API_TOKEN" \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals" | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const data=JSON.parse(d);
  data.payload.forEach(p=>console.log("Portal:",p.name,"| slug:",p.slug,"| articles:",p.meta.all_articles_count));
})'
```

Present the portals to the user with AskUserQuestion and let them choose. Use the portal `slug` (not name or ID) for all subsequent API calls.

### Step 3: Select or create a category

List categories for the chosen portal:

```bash
rtk proxy curl -s -H "api_access_token: $CHATWOOT_API_TOKEN" \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/categories" | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const data=JSON.parse(d);
  data.payload.forEach(c=>console.log("id:",c.id,"| name:",c.name,"| slug:",c.slug,"| locale:",c.locale));
})'
```

If categories exist, present them to the user to choose. If no categories exist, ask the user for a category name and create one.

**When creating a category, the `slug` field is REQUIRED** — the API returns an error without it:

```bash
rtk proxy curl -s -X POST \
  -H "api_access_token: $CHATWOOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Category Name","slug":"category-slug","locale":"pt_BR","description":"Category description"}' \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/categories"
```

### Step 4: Upload images

Upload each image file using the Chatwoot upload endpoint. This returns an Active Storage URL for each image.

```bash
source .env
SCREENSHOTS_DIR="/absolute/path/to/screenshots"

for img in "$SCREENSHOTS_DIR"/*.png; do
  filename=$(basename "$img")
  url=$(rtk proxy curl -s -X POST \
    -H "api_access_token: $CHATWOOT_API_TOKEN" \
    -F "attachment=@$img" \
    "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/upload" \
    | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>console.log(JSON.parse(d).file_url))')
  echo "$filename|$url"
done
```

The endpoint returns:
```json
{
  "file_url": "https://chatwoot.example.com/rails/active_storage/blobs/redirect/{signed_id}/{filename}",
  "blob_id": "{signed_id}"
}
```

Save the `filename|url` mapping — you'll need it in the next step.

**Important:** The field name for the file must be `attachment` (not `file`). Using `file` returns `422 No file or URL provided`.

### Step 5: Create the article with hosted image URLs

Prepare the article content:
1. Read the source Markdown file
2. Strip YAML frontmatter (everything between the opening `---` and closing `---`)
3. Replace all local image paths (`./screenshots/filename.png`) with the Active Storage URLs from Step 4

Use `node -e` to build the JSON payload to avoid shell escaping issues with special characters in the content:

```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('<markdown_file>', 'utf8');
let body = content.replace(/^---[\\s\\S]*?---\\n*/, '');

// Replace each local image path with the Active Storage URL
const replacements = {
  './screenshots/01-image.png': '<uploaded_url_01>',
  './screenshots/02-image.png': '<uploaded_url_02>',
  // ... for each image from Step 4
};
for (const [local, remote] of Object.entries(replacements)) {
  body = body.split(local).join(remote);
}

const payload = {
  title: '<title>',
  slug: '<url-friendly-slug>',
  content: body,
  description: '<brief summary for search/preview>',
  category_id: <id>,
  author_id: <id>,
  status: 1,
  locale: 'pt_BR'
};
process.stdout.write(JSON.stringify(payload));
" > /tmp/chatwoot_article.json

rtk proxy curl -s -X POST \
  -H "api_access_token: $CHATWOOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/chatwoot_article.json \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/articles"
```

Payload fields:
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Article heading (extract from H1 or frontmatter) |
| `slug` | string | URL-friendly identifier (e.g., `como-abrir-fechar-sessao-pdv`) |
| `content` | string | Markdown body with Active Storage image URLs |
| `description` | string | Brief summary for search/preview |
| `category_id` | integer | ID from Step 3 |
| `author_id` | integer | ID from Step 1 |
| `status` | integer | `0` = draft, `1` = published, `2` = archived |
| `locale` | string | e.g., `pt_BR` |

Save the returned article `id` for verification.

### Step 6: Verify the result

Fetch the article and confirm all images point to Active Storage URLs:

```bash
rtk proxy curl -s -H "api_access_token: $CHATWOOT_API_TOKEN" \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/articles/{article_id}" | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const p=JSON.parse(d).payload;
  const imgs = p.content.match(/!\[[^\]]*\]\([^)]+\)/g) || [];
  console.log("Article:", p.title, "| Status:", p.status);
  console.log("Category:", p.category?.name || "none");
  console.log("Total images:", imgs.length);
  const broken = imgs.filter(m => m.includes("./screenshots/"));
  if (broken.length > 0) console.log("BROKEN images (local paths):", broken.length);
  else console.log("All images OK (Active Storage URLs)");
})'
```

## Updating an Existing Article

To update an existing article (e.g., re-publish after edits):

1. List articles to find the one to update:
```bash
rtk proxy curl -s -H "api_access_token: $CHATWOOT_API_TOKEN" \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/articles?locale=pt_BR" | node -e '
let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
  const data=JSON.parse(d);
  data.payload.forEach(a=>console.log("id:",a.id,"| title:",a.title,"| status:",a.status));
})'
```

2. Upload new images (Step 4) if the screenshots changed.

3. Update the article via PUT:
```bash
rtk proxy curl -s -X PUT \
  -H "api_access_token: $CHATWOOT_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/chatwoot_article_update.json \
  "$CHATWOOT_BASE_URL/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/{portal_slug}/articles/{article_id}"
```

## Critical Rules

1. **All endpoints need `accounts/{id}` in the path.** Without it, you get 404. The pattern is always `/api/v1/accounts/$CHATWOOT_ACCOUNT_ID/portals/...`.

2. **Image upload uses `POST /accounts/{id}/upload` with `attachment` field.** This is a simple multipart form upload — no Playwright, no CSRF tokens, no session cookies needed. The `api_access_token` header is sufficient.

3. **Upload images FIRST, then create the article.** Upload all images, collect their URLs, replace local paths in the content, and create the article in a single POST with correct image URLs. This avoids an extra PUT call.

4. **Always use `rtk proxy curl`** when you need to parse the JSON response. Regular `curl` output gets filtered by RTK.

5. **The upload `attachment` field name is case-sensitive.** Using `file` instead of `attachment` returns 422.

6. **Category creation requires a `slug` field.** The API returns `"Slug can't be blank"` without it. Always generate a slug from the category name.

7. **Use `node -e` for JSON parsing** as a fallback when `rtk proxy` is unavailable. Never use `python3 -m json.tool`.

8. **Strip YAML frontmatter before publishing.** Use the regex `/^---[\s\S]*?---\n*/` to remove it. Chatwoot renders the content as-is.

9. **Article status values:** `0` = draft, `1` = published, `2` = archived. Default to `1` (published) unless the user asks otherwise.

10. **Use portal `slug` (not ID or name) in API URLs.** The portals endpoint returns both, but the articles/categories endpoints expect the slug.

11. **Provide `slug` and `description` when creating articles.** The `slug` should be a URL-friendly version of the title (e.g., `como-abrir-fechar-sessao-pdv`). The `description` is used for search/preview in the help center widget.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| 404 on portal/article endpoints | Missing `accounts/{id}` in URL path | Add `/accounts/$CHATWOOT_ACCOUNT_ID/` before `portals/...` |
| 401 Unauthorized | Token expired or invalid | Ask user to regenerate in Chatwoot > Settings > Profile |
| 422 `"No file or URL provided"` | Wrong field name in upload | Use `attachment` not `file` in the multipart form |
| Category creation `"Slug can't be blank"` | Missing `slug` field | Add a slugified version of the category name |
| JSON parse error in responses | RTK filtering JSON values | Use `rtk proxy curl` or `node -e` for parsing |
| Images show broken in article | Local paths not replaced | Verify Step 4 URLs were correctly substituted in content |

## Example: Publishing a Tutorial

```
Input:
  - markdown_file: squads/my-squad/output/2026-03-23/v1/tutorial-final.md
  - screenshots_dir: squads/my-squad/output/2026-03-23/v1/screenshots/
  - portal_slug: guia-do-usurio
  - category: Ponto de Venda (PDV)

Steps:
  1. source .env -> load CHATWOOT_BASE_URL, CHATWOOT_API_TOKEN, CHATWOOT_ACCOUNT_ID
  2. GET /api/v1/profile -> author_id
  3. GET /accounts/$CHATWOOT_ACCOUNT_ID/portals -> user selects portal slug
  4. GET /accounts/$CHATWOOT_ACCOUNT_ID/portals/{slug}/categories -> user selects category_id
  5. Upload PNGs via POST /accounts/$CHATWOOT_ACCOUNT_ID/upload -> get Active Storage URLs
  6. Build article JSON: strip frontmatter, replace local paths with URLs
  7. POST /accounts/$CHATWOOT_ACCOUNT_ID/portals/{slug}/articles -> article created (published)
  8. GET /accounts/$CHATWOOT_ACCOUNT_ID/portals/{slug}/articles/{id} -> verify all images OK
```
