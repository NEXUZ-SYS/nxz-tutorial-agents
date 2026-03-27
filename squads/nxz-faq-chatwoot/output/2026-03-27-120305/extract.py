#!/usr/bin/env python3
"""
Extract resolved conversations from Chatwoot API.
Collects all messages per conversation, classifies by product, generates context.
"""
import os
import sys
import json
import time
import re
import subprocess
from datetime import datetime, timezone

# Config
BASE_URL = os.environ["CHATWOOT_BASE_URL"]
ACCOUNT_ID = os.environ["CHATWOOT_ACCOUNT_ID"]
TOKEN = os.environ["CHATWOOT_API_TOKEN"]
INBOX_IDS = [19, 21]
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "v1", "extracted-conversations.json")

PRODUCT_KEYWORDS = {
    "NXZ Go": ["totem", "autoatendimento", "nxz go", "nxzgo"],
    "NXZ KDS": ["kds", "kitchen", "cozinha", "display de cozinha"],
    "NXZ Delivery": ["ifood", "rappi", "uber eats", "delivery", "centralizador", "aiqfome"],
    "NXZ Pay Go": ["maquininha", "maquina de cartao", "pay go", "paygo", "maquina cartao", "stone", "rede"],
    "NXZ ERP": ["erp", "odoo", "pdv", "nfe", "nota fiscal", "fiscal", "estoque", "financeiro", "caixa", "comanda", "cardapio"],
}

def api_get(path):
    """GET request to Chatwoot API."""
    url = f"{BASE_URL}/api/v1/accounts/{ACCOUNT_ID}/{path}"
    result = subprocess.run(
        ["curl", "-s", url, "-H", f"api_access_token: {TOKEN}"],
        capture_output=True, text=True, timeout=30
    )
    return json.loads(result.stdout)

def api_post(path, data, page=1):
    """POST request to Chatwoot API."""
    url = f"{BASE_URL}/api/v1/accounts/{ACCOUNT_ID}/{path}?page={page}"
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", url,
         "-H", f"api_access_token: {TOKEN}",
         "-H", "Content-Type: application/json",
         "-d", json.dumps(data)],
        capture_output=True, text=True, timeout=30
    )
    return json.loads(result.stdout)

def fetch_all_resolved_conversations(inbox_id):
    """Fetch all resolved conversations for an inbox with pagination."""
    all_convs = []
    page = 1
    payload = {
        "payload": [
            {"attribute_key": "status", "filter_operator": "equal_to", "values": ["resolved"], "query_operator": "AND"},
            {"attribute_key": "created_at", "filter_operator": "is_greater_than", "values": ["2025-12-27"], "query_operator": "AND"},
            {"attribute_key": "inbox_id", "filter_operator": "equal_to", "values": [inbox_id], "query_operator": None}
        ]
    }

    while True:
        data = api_post("conversations/filter", payload, page=page)
        convs = data.get("payload", [])
        total = data.get("meta", {}).get("all_count", 0)
        all_convs.extend(convs)
        print(f"  Inbox {inbox_id}: page {page}, got {len(convs)} convs (total so far: {len(all_convs)}/{total})", flush=True)

        if len(convs) < 25 or len(all_convs) >= total:
            break
        page += 1
        time.sleep(0.05)  # Light rate limiting

    return all_convs

def fetch_messages(conversation_id):
    """Fetch all messages for a conversation."""
    data = api_get(f"conversations/{conversation_id}/messages")
    return data.get("payload", [])

def classify_product(labels, messages_text):
    """Classify conversation by product."""
    # Check labels first
    label_str = " ".join(labels).lower()
    for product, keywords in PRODUCT_KEYWORDS.items():
        for kw in keywords:
            if kw in label_str:
                return product

    # Check message content
    text_lower = messages_text.lower()
    for product, keywords in PRODUCT_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                return product

    return "indefinido"

def detect_channel(conv):
    """Detect conversation channel."""
    additional = conv.get("additional_attributes", {}) or {}
    channel_type = additional.get("type", "")
    if channel_type:
        return channel_type

    # Fallback: check inbox meta
    meta = conv.get("meta", {}) or {}
    channel = meta.get("channel", "")
    if channel:
        return channel

    return "unknown"

def ts_to_iso(ts):
    """Convert Unix timestamp to ISO format."""
    if isinstance(ts, (int, float)):
        return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return str(ts)

def ts_to_time(ts):
    """Convert Unix timestamp to HH:mm:ss.SSS format."""
    if isinstance(ts, (int, float)):
        dt = datetime.fromtimestamp(ts, tz=timezone.utc)
        return dt.strftime("%H:%M:%S.000")
    return str(ts)

def format_conversation_for_llm(conv_id, channel, messages):
    """Format conversation for LLM context generation."""
    lines = [f"Conversation ID: #{conv_id}", f"Channel: {channel}", "Message History:"]
    for msg in messages:
        if msg["role"] == "customer":
            lines.append(f"User: {msg['text']}")
        elif msg["role"] == "agent":
            if msg.get("private"):
                lines.append(f"[Private Note] Support Agent: {msg['text']}")
            else:
                lines.append(f"Support Agent: {msg['text']}")
        elif msg["role"] == "bot":
            lines.append(f"Bot: {msg['text']}")
    return "\n".join(lines)

def process_messages(raw_messages):
    """Process raw API messages into structured format."""
    processed = []
    for m in raw_messages:
        msg_type = m.get("message_type")
        content = m.get("content")
        sender = m.get("sender") or {}
        sender_type = sender.get("type", "")
        private = m.get("private", False)
        created_at = m.get("created_at", 0)

        # Skip activity (2) and template (3) messages
        # Actually keep type 3 (bot) for context, skip type 2 (activity)
        if msg_type == 2:
            continue
        if not content or content.strip() == "":
            continue

        if msg_type == 0 and sender_type == "contact":
            role = "customer"
        elif msg_type == 1:
            role = "agent"
        elif msg_type == 3:
            role = "bot"
        else:
            continue

        processed.append({
            "role": role,
            "time": ts_to_time(created_at),
            "text": content.strip(),
            "private": private,
            "_created_at": created_at  # For sorting
        })

    # Sort strictly by timestamp
    processed.sort(key=lambda x: x["_created_at"])

    # Remove internal sorting key and private flag from output (keep private for LLM formatting)
    result = []
    for p in processed:
        entry = {"role": p["role"], "time": p["time"], "text": p["text"]}
        result.append(entry)
        # Store private flag temporarily for LLM formatting
        entry["_private"] = p["private"]

    return result

def generate_context(conv_id, channel, messages):
    """Generate context_conversation via LLM (Claude)."""
    # Format conversation text
    conv_text = format_conversation_for_llm(conv_id, channel, messages)

    system_prompt = """You are an AI-powered conversation analysis tool for NXZ support tickets. Your task is to analyze conversations between support agents and customers and extract structured context that will be used to generate FAQ articles for the NXZ Help Center.

Rules:
1. Be brief and concise in all fields.
2. Focus exclusively on information relevant to the customer's problem and its resolution. Remove greetings, farewells, and off-topic exchanges.
3. Identify the NXZ product involved (NXZ ERP, NXZ Go, NXZ KDS, NXZ Delivery, NXZ Pay Go) and the specific feature or module.
4. For causa_raiz, use only what can be inferred from the agent's responses. Use "nao identificada" when not determinable.
5. For resolucao, describe what actually resolved the issue. Use "nao confirmada" if the customer did not confirm resolution.
6. Do not include personal data: customer names, phone numbers, account IDs.
7. Do not insert your own opinions or add information not present in the conversation.
8. The observacoes field is optional - only populate it if there is relevant contextual information.
9. If a section has no content, set its value to null.
10. Mark technically important terms in bold using markdown syntax.
11. Reply in Brazilian Portuguese.

Output must be valid JSON with exactly these fields:
{
  "problema_principal": "...",
  "produto_funcionalidade": "...",
  "causa_raiz": "...",
  "resolucao": "...",
  "observacoes": "..." or null
}"""

    # Use Claude API via subprocess
    api_payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 500,
        "system": system_prompt,
        "messages": [{"role": "user", "content": conv_text}]
    }

    anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not anthropic_key:
        return {"problema_principal": None, "produto_funcionalidade": None, "causa_raiz": None, "resolucao": None, "observacoes": None}

    result = subprocess.run(
        ["curl", "-s", "https://api.anthropic.com/v1/messages",
         "-H", f"x-api-key: {anthropic_key}",
         "-H", "anthropic-version: 2023-06-01",
         "-H", "Content-Type: application/json",
         "-d", json.dumps(api_payload)],
        capture_output=True, text=True, timeout=60
    )

    try:
        response = json.loads(result.stdout)
        text = response.get("content", [{}])[0].get("text", "{}")
        # Extract JSON from response (might be wrapped in markdown)
        json_match = re.search(r'\{[^{}]*"problema_principal"[^{}]*\}', text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        return json.loads(text)
    except (json.JSONDecodeError, IndexError, KeyError) as e:
        print(f"  Warning: LLM context generation failed for conv {conv_id}: {e}", flush=True)
        return {"problema_principal": None, "produto_funcionalidade": None, "causa_raiz": None, "resolucao": None, "observacoes": None}

def main():
    print("=== Chatwoot Conversation Extractor ===", flush=True)
    print(f"Period: 2025-12-27 to 2026-03-27", flush=True)

    # Step 1: Fetch all resolved conversations
    print("\n--- Fetching resolved conversations ---", flush=True)
    all_conversations = []
    for inbox_id in INBOX_IDS:
        convs = fetch_all_resolved_conversations(inbox_id)
        all_conversations.extend(convs)
        print(f"  Inbox {inbox_id}: {len(convs)} conversations", flush=True)

    # Deduplicate by conversation ID
    seen = set()
    unique_convs = []
    for c in all_conversations:
        cid = c["id"]
        if cid not in seen:
            seen.add(cid)
            unique_convs.append(c)

    print(f"\nTotal unique conversations: {len(unique_convs)}", flush=True)

    # Step 2: Process each conversation
    print("\n--- Processing conversations ---", flush=True)
    results = []
    by_product = {"NXZ ERP": 0, "NXZ Go": 0, "NXZ KDS": 0, "NXZ Delivery": 0, "NXZ Pay Go": 0, "indefinido": 0}

    for i, conv in enumerate(unique_convs):
        conv_id = conv["id"]
        labels = conv.get("labels", [])
        channel = detect_channel(conv)
        created_at = ts_to_iso(conv.get("created_at", 0))

        # Fetch full messages
        raw_messages = fetch_messages(conv_id)
        messages = process_messages(raw_messages)

        # Build full text for classification
        all_text = " ".join(m["text"] for m in messages)
        product = classify_product(labels, all_text)
        by_product[product] = by_product.get(product, 0) + 1

        # Context will be generated in a second pass
        context = {"problema_principal": None, "produto_funcionalidade": None, "causa_raiz": None, "resolucao": None, "observacoes": None}

        # Clean up private flags from messages
        for m in messages:
            m.pop("_private", None)

        # Find resolved_at (last message timestamp or conversation updated_at)
        resolved_at = ts_to_iso(conv.get("updated_at", conv.get("timestamp", 0)))

        result = {
            "conversation_id": conv_id,
            "product": product,
            "labels": labels,
            "channel": channel,
            "created_at": created_at,
            "resolved_at": resolved_at,
            "messages": messages,
            "context_conversation": context
        }
        results.append(result)

        if (i + 1) % 10 == 0:
            print(f"  Progress: {i+1}/{len(unique_convs)} conversations processed", flush=True)

        time.sleep(0.05)  # Rate limiting

    # Step 3: Build output
    output = {
        "extraction_date": "2026-03-27",
        "period": {"start": "2025-12-27", "end": "2026-03-27"},
        "total_conversations": len(results),
        "conversations": results,
        "by_product": by_product
    }

    # Save
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n=== Extraction Complete ===", flush=True)
    print(f"Total conversations: {len(results)}", flush=True)
    print(f"By product: {json.dumps(by_product, indent=2)}", flush=True)
    print(f"Output saved to: {OUTPUT_PATH}", flush=True)

if __name__ == "__main__":
    main()
