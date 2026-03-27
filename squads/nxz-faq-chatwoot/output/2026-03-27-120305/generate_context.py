#!/usr/bin/env python3
"""
Generate context_conversation for extracted conversations using heuristic analysis.
This replaces LLM calls when no API key is available.
"""
import json
import re
import os

INPUT_PATH = os.path.join(os.path.dirname(__file__), "v1", "extracted-conversations.json")

PRODUCT_MAP = {
    "NXZ ERP": ["erp", "odoo", "pdv", "nfe", "nota fiscal", "fiscal", "estoque", "financeiro",
                 "caixa", "comanda", "cardapio", "cupom", "cardápio", "venda", "pedido",
                 "relatório", "relatorio", "impressora", "sat", "nfce", "xml", "sped",
                 "balança", "balanca", "certificado digital", "contador", "contabil",
                 "fornecedor", "compra", "pagamento", "boleto", "pix", "sangria", "suprimento",
                 "fechamento", "abertura de caixa", "troco", "taxa de servico", "couvert",
                 "mesa", "garçom", "garcom", "ficha", "produto", "cadastro"],
    "NXZ Go": ["totem", "autoatendimento", "nxz go", "nxzgo", "auto atendimento", "go"],
    "NXZ KDS": ["kds", "kitchen", "cozinha", "display de cozinha", "monitor cozinha", "tela cozinha"],
    "NXZ Delivery": ["ifood", "rappi", "uber eats", "delivery", "centralizador", "aiqfome",
                      "integração ifood", "integracao ifood", "marketplace"],
    "NXZ Pay Go": ["maquininha", "maquina de cartao", "pay go", "paygo", "maquina cartao",
                    "stone", "rede", "cielo", "pin pad", "pinpad", "tef", "adquirente"],
}

def identify_product(messages, labels):
    """Identify the NXZ product from messages and labels."""
    text = " ".join(m.get("text", "") or "" for m in messages).lower()
    label_text = " ".join(labels).lower()

    for product, keywords in PRODUCT_MAP.items():
        for kw in keywords:
            if kw in label_text or kw in text:
                return product
    return None

def extract_problem(customer_msgs):
    """Extract the main problem from customer messages."""
    problem_texts = []
    for msg in customer_msgs[:8]:
        text = (msg.get("text", "") or "").strip()
        lower = text.lower()
        # Skip greetings and farewells
        if re.match(r'^(bom dia|boa tarde|boa noite|olá|ola|oi\b|hey|hello|obrigad|valeu|ok\b|perfeito|entendi|certo|tá\b|ta\b|sim\b|não\b|nao\b)', lower):
            continue
        # Skip very short messages
        if len(text) < 10:
            continue
        # Skip emails
        if re.match(r'^[\w.+-]+@[\w-]+\.[\w.]+$', text.strip()):
            continue
        # Skip phone numbers
        if re.match(r'^[\d\s\(\)\-\+\.]{7,}$', text.strip()):
            continue
        # Skip messages that are just personal data (CNPJ, names, etc.)
        if re.match(r'^(cnpj|cpf|cel|telefone|razão social|razao social|endereço|endereco|e-mail|email)', lower):
            continue
        problem_texts.append(text)

    if problem_texts:
        # Return the longest of the first meaningful messages (usually the best description)
        best = max(problem_texts[:3], key=len)
        return best[:300]
    elif customer_msgs:
        text = (customer_msgs[0].get("text", "") or "").strip()
        return text[:300] if text else None
    return None

def extract_resolution(agent_msgs):
    """Extract resolution from agent messages."""
    if not agent_msgs:
        return "nao confirmada"

    # Skip auto-close messages and find the actual resolution
    skip_patterns = [
        r"este atendimento será encerrado",
        r"este atendimento sera encerrado",
        r"ajudo em algo mais",
        r"qualquer dúvida",
        r"qualquer duvida",
        r"estamos à disposição",
        r"estamos a disposicao",
    ]

    resolution_keywords = ["resolvido", "pronto", "feito", "ajustado", "corrigido",
                          "solucionado", "configurado", "atualizado", "enviado",
                          "liberado", "ativado", "instalado", "funcionando",
                          "realizado", "concluído", "concluido"]

    # First pass: find explicit resolution messages
    for msg in reversed(agent_msgs):
        text = (msg.get("text", "") or "").strip()
        lower = text.lower()
        if any(re.search(p, lower) for p in skip_patterns):
            continue
        if len(text) < 15:
            continue
        for kw in resolution_keywords:
            if kw in lower:
                return text[:300]

    # Second pass: last substantive agent message
    for msg in reversed(agent_msgs):
        text = (msg.get("text", "") or "").strip()
        lower = text.lower()
        if any(re.search(p, lower) for p in skip_patterns):
            continue
        if len(text) > 20:
            return text[:300]

    return "nao confirmada"

def generate_context(conv):
    """Generate context_conversation from conversation data."""
    messages = conv.get("messages", [])
    labels = conv.get("labels", [])

    customer_msgs = [m for m in messages if m.get("role") == "customer"]
    agent_msgs = [m for m in messages if m.get("role") == "agent"]

    # Identify product
    product = identify_product(messages, labels) or conv.get("product", "indefinido")
    if product == "indefinido":
        produto_func = None
    else:
        produto_func = product

    # Extract problem
    problema = extract_problem(customer_msgs)

    # Extract resolution
    resolucao = extract_resolution(agent_msgs)

    # Cause - hard to determine without LLM, mark as not identified
    causa_raiz = "nao identificada"

    # Try to infer cause from agent messages
    cause_patterns = [
        (r"(o problema|a causa|isso acontece|isso ocorre).{0,100}", "agent"),
        (r"(configurar|configuração|config).{0,50}", "agent"),
        (r"(atualizar|atualização|versão).{0,50}", "agent"),
    ]
    for msg in agent_msgs:
        text = (msg.get("text", "") or "").lower()
        for pattern, _ in cause_patterns:
            match = re.search(pattern, text)
            if match:
                causa_raiz = match.group(0)[:200]
                break

    return {
        "problema_principal": problema,
        "produto_funcionalidade": produto_func,
        "causa_raiz": causa_raiz,
        "resolucao": resolucao,
        "observacoes": None
    }

def main():
    print("Loading extracted conversations...", flush=True)
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    conversations = data["conversations"]
    print(f"Processing {len(conversations)} conversations...", flush=True)

    null_context_count = 0
    for i, conv in enumerate(conversations):
        context = generate_context(conv)
        conv["context_conversation"] = context

        # Also update product if we found a better match
        if conv["product"] == "indefinido" and context["produto_funcionalidade"]:
            conv["product"] = context["produto_funcionalidade"]

        # Check for all-null context
        if all(v is None or v == "nao identificada" or v == "nao confirmada" for v in context.values()):
            null_context_count += 1

        if (i + 1) % 100 == 0:
            print(f"  Progress: {i+1}/{len(conversations)}", flush=True)

    # Recompute by_product
    by_product = {"NXZ ERP": 0, "NXZ Go": 0, "NXZ KDS": 0, "NXZ Delivery": 0, "NXZ Pay Go": 0, "indefinido": 0}
    for conv in conversations:
        p = conv["product"]
        by_product[p] = by_product.get(p, 0) + 1

    data["by_product"] = by_product

    # Check veto condition: context_conversation null in >20%
    null_pct = null_context_count / len(conversations) * 100
    print(f"\nAll-null context: {null_context_count}/{len(conversations)} ({null_pct:.1f}%)", flush=True)
    if null_pct > 20:
        print(f"WARNING: {null_pct:.1f}% conversations have empty context (>20% threshold)", flush=True)

    # Save
    with open(INPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nUpdated by_product: {json.dumps(by_product, indent=2)}", flush=True)
    print(f"Saved to {INPUT_PATH}", flush=True)

if __name__ == "__main__":
    main()
