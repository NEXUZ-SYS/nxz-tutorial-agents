---
name: notion-publisher
description: >
  Publish documents with images to Notion.so pages. Handles image hosting,
  page creation, and image embedding via the Notion MCP integration.
  Use when a squad pipeline needs to save its final output to Notion.
description_pt-BR: >
  Publica documentos com imagens em paginas do Notion.so. Gerencia hospedagem
  de imagens, criacao de paginas e insercao de imagens via integracao MCP do Notion.
  Use quando o pipeline de uma squad precisar salvar o output final no Notion.
type: prompt
version: 1.0.0
categories: [publishing, documentation, notion]
---

# Notion Publisher

## When to use

Use this skill when the pipeline needs to publish a final document (tutorial, report, article) to Notion.so, especially when the document contains local image files that need to be embedded.

## Prerequisites Check

Before publishing, verify the Notion MCP integration is available. Run a quick test:

1. Call `mcp__claude_ai_Notion__notion-search` with a simple query
2. If the tool is NOT available or returns an auth error:
   - Inform the user: "The Notion MCP integration is not configured or not authenticated."
   - Guide them: "Please enable the Notion integration in your Claude settings (claude.ai > Settings > Integrations > Notion) and grant access to the target workspace."
   - Do NOT proceed until the integration is confirmed working.
3. If the tool works, proceed.

## Publishing Flow

### Step 1: Locate the target parent page

Ask the user where to publish, or use the squad's configured target. Search for the parent page:

```
mcp__claude_ai_Notion__notion-search with query = "<parent page name>"
```

Confirm the parent page ID with the user if ambiguous.

### Step 2: Upload local images to get public URLs

The Notion API only accepts external image URLs — it cannot receive local file uploads. Every local image must be hosted first.

**Use catbox.moe** (no auth required, direct URLs, supports PNG/JPG/GIF):

```bash
curl -s -F "reqtype=fileupload" -F "fileToUpload=@/path/to/image.png" https://catbox.moe/user/api.php
```

This returns a direct URL like `https://files.catbox.moe/abc123.png`.

Upload all images in a single loop and store the mapping:

```bash
for f in /path/to/screenshots/*.png; do
  name=$(basename "$f")
  url=$(curl -s -F "reqtype=fileupload" -F "fileToUpload=@$f" https://catbox.moe/user/api.php)
  echo "$name|$url"
done
```

**Rules:**
- Upload ALL images before creating the Notion page
- Verify each URL is valid (starts with `https://files.catbox.moe/`)
- If catbox.moe is down, try `https://litterbox.catbox.moe/resources/internals/api.php` with `time=72h` as fallback
- Keep a name-to-URL mapping for the next steps

### Step 3: Create the page with text AND images in one shot

Do NOT create a text-only page and then update it with images separately. Create everything at once — this avoids race conditions and reduces API calls.

Convert the source markdown to Notion-flavored markdown:
- Replace local image paths `![alt](./screenshots/file.png)` with hosted URLs `![alt](https://files.catbox.moe/xxx.png)`
- Remove YAML frontmatter (Notion doesn't support it)
- Remove the H1 title from content body (it goes in the `title` property instead)
- Keep all other markdown as-is (headings, lists, blockquotes, checkboxes, bold, italic, code blocks all work)

```
mcp__claude_ai_Notion__notion-create-pages with:
  parent: { "page_id": "<parent-page-id>" }
  pages: [{
    "properties": { "title": "<document title>" },
    "icon": "<relevant emoji>",
    "content": "<full markdown with image URLs>"
  }]
```

**Image syntax in Notion markdown:**
```markdown
![Alt text description](https://files.catbox.moe/abc123.png)
```

The alt text becomes the image caption in Notion.

### Step 4: Verify the result

After creation, fetch the page to confirm content was saved correctly:

```
mcp__claude_ai_Notion__notion-fetch with id = "<new-page-id>"
```

Check that:
- All headings are present
- Image blocks appear (they show as `![...](...)`  in the fetched content)
- No content was truncated

If images are missing, use `notion-update-page` with `update_content` command to insert them:

```
mcp__claude_ai_Notion__notion-update-page with:
  page_id: "<page-id>"
  command: "update_content"
  content_updates: [{
    "old_str": "*Figure caption text*",
    "new_str": "![Alt text](https://hosted-url.png)\n*Figure caption text*"
  }]
```

This requires fetching the page first to get exact `old_str` matches.

## Critical Rules

These rules come from real production failures — follow them strictly:

1. **Never reference local file paths in Notion content.** `![alt](./screenshots/file.png)` will show as a broken image. Always use hosted URLs.

2. **Always upload images BEFORE creating the page.** The page creation call is atomic — you can't add images to it after the fact without a separate update call.

3. **The Notion MCP is a Claude AI remote integration**, not a local MCP server. It's configured at the Claude account level (Settings > Integrations), not in `.mcp.json`. If the tools aren't available, the user needs to enable it in their Claude settings.

4. **Notion's `create-pages` content field does not support the `notion://docs/enhanced-markdown-spec` resource fetch** (it returns a validation error). Use standard markdown with images as `![alt](url)`.

5. **For `update_content`, always fetch the page first.** The `old_str` field requires an exact match of the current page content. Guessing will fail silently or error.

6. **Don't use Playwright to interact with Notion's web UI.** Notion's SPA takes too long to load in automated browsers and often gets stuck on the loading spinner. Always use the MCP API tools instead.

7. **catbox.moe URLs are semi-permanent** (files stay for months of inactivity). For truly permanent hosting, the user should manually upload images to Notion after page creation by editing the page in their browser.

8. **Prefer `replace_content` over delete+recreate.** The Notion MCP has no delete-page tool. To redo a page, use `replace_content` on the existing page — it's atomic and replaces everything in one call. This is also better than `update_content` with multiple search-and-replace operations, which can fail if old_str doesn't match exactly.

9. **No Notion delete-page API.** If you need to "start fresh", use `replace_content` with the full new content. Don't waste time looking for a delete tool — it doesn't exist in this MCP.

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| Tool `mcp__claude_ai_Notion__*` not found | Notion MCP not enabled | Ask user to enable in Claude Settings > Integrations |
| `validation_error` on search/fetch | Not authenticated to workspace | Ask user to re-authorize Notion in Claude settings |
| catbox.moe returns error | User agent blocked or service down | Retry with explicit user agent: `-A "curl/8.0"` |
| `update_content` old_str not found | Page content doesn't match | Fetch page first, copy exact text for old_str |
| Page created but images missing | Used local paths instead of URLs | Upload images, then update page with hosted URLs |

## Example: Publishing a Tutorial

```
Input:
  - markdown_file: output/v1/tutorial-final.md
  - screenshots_dir: output/v1/screenshots/
  - parent_page: "Testes tutoriais com IA"

Steps:
  1. Search Notion for "Testes tutoriais com IA" -> get parent_id
  2. Upload 5 PNGs from screenshots/ to catbox.moe -> get 5 URLs
  3. Read tutorial-final.md
  4. Replace ./screenshots/01-painel.png with https://files.catbox.moe/abc.png (etc)
  5. Strip frontmatter and H1 title
  6. Create page under parent_id with processed content and images
  7. Fetch page to verify -> done
```
