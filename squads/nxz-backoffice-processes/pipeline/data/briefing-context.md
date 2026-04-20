# Briefing Context — 2026-04-16

## 1. Demanda

A Nexuz precisa instalar uma **máquina de vendas previsível** para NXZ Go e NXZ ERP no mercado Food Service. Hoje a operação gira em torno da Carol (vendedora sênior) + SDRs, **sem CRM instrumentado**: cada oportunidade é acompanhada manualmente, comprometendo previsibilidade de MRR, visibilidade do funil e qualidade do handoff para Implantação.

**Sintomas observados:**
- Funil sem instrumentação → não há win rate, ciclo médio nem forecast confiável.
- Perda de leads por falta de cadência definida e ausência de alertas de ociosidade.
- Handoff Vendas → Implantação informal (chat/planilha), gerando atrito na virada do cliente para produção.
- "Perdidos" não são registrados com motivo → impede ajuste do ICP.

**Quantificação do impacto (estado atual):** desconhecido — exatamente porque o funil não é mensurado. Métricas-alvo (Q2/2026): MRR ≥ R$ 50k/mês, Win Rate ≥ 25%, Ciclo médio ≤ 21 dias, ≥ 90% Perdidos com motivo, ≥ 40 demos/mês.

**Estado do desenho:** o processo agnóstico de 9 etapas + cadências (Primeiro Contato, Proposta, Nutrição) + checklists de transição F1..F6 + 16 automações já foi desenhado pelo squad `nxz-clickup-setup`. Referência: `squads/nxz-clickup-setup/output/2026-04-13-163931/v1/processo-vendas-agnostico.md`.

**O que falta:** pilotar a configuração numa ferramenta operacional. **Pipefy é a ferramenta-piloto desta rodada** (apenas para contexto operacional — o PDD permanece tool-agnostic, conforme princípio do squad).

## 2. Área Impactada Principal

**Vendas** (owner operacional: Carol Oliveira)

## 3. Áreas Impactadas Adicionais

- **Relacionamento / Implantação** (Matheus, Luiz) — recebe handoff automático no Live; card espelho criado cross-pipeline
- **Financeiro** (Sabrina) — emite boleto via Asaas e confirma pagamento (gate F6)
- **Jurídico / Administrativo** — emite contrato, coleta assinatura digital (gate F6)
- **Sponsor comercial** (Walter Frey) — aprova desconto fora do teto (>15%), valida ICP, recebe forecast ponderado
- **TI / Admin da ferramenta** — configura campos, automações, dashboards, permissões; mantém integrações ERP e Calendar

## 4. Contextos Adicionais

### Documentos-fonte
- 📄 `squads/nxz-clickup-setup/output/2026-04-13-163931/v1/processo-vendas-agnostico.md` — **processo-fonte**, 9 etapas, 16 automações, 14 riscos, 25 regras, RACI, KPIs Q2/2026
- 📄 Funil NXZ v1.0 (Carol) — origem do desenho
- 📄 Workspace Design v1 — estudo prévio em ClickUp
- 📄 Briefing CRM Agnóstico — input estratégico

### Ferramenta-piloto
- 🛠️ **Pipefy** — usada exclusivamente como contexto operacional para validar a viabilidade do desenho. Dossiê técnico em `squads/nxz-backoffice-processes/output/2026-04-16-165948/v1/pipefy-dossier.md`.
- **Riscos técnicos identificados (do dossiê) que o PDD precisa endereçar como pontos de atenção:**
  1. **Quota de automation jobs** (300/mês no plano Business) pode estourar com as 16 cadências F1..F6 → o desenho deve permitir consolidação de triggers ou fallback de plano.
  2. **Conditional fields não disparam via API** → gates de validação por integração (ex.: Odoo/Asaas populando campos via GraphQL) precisam de regra alternativa.
  3. **Sem integração nativa com Google Calendar, Odoo e Asaas** → o desenho deve isolar essas integrações em "linha pontilhada" (middleware Make/n8n) sem acoplar à ferramenta-CRM.

### Premissas operacionais (herdadas do processo-fonte)
- Comunicação **externa com lead**: apenas e-mail transacional (nunca WhatsApp na v1).
- Comunicação **interna entre time**: notificação nativa da ferramenta (comentário + menção) — proibido e-mail interno para cobrar colegas.
- CNPJ armazenado em **14 dígitos puros, sem máscara** (compatibilidade Odoo/Asaas).
- Cada Lead/Deal pertence a **uma única Conta** (1:1); Contatos ligam-se a Conta (N:1).

### Escopo do piloto Pipefy (decisão Walter, 2026-04-16)
- **Pipeline completo (9 etapas)** — incluindo Nutrição, Perdido e handoff cross-pipeline para Implantação.
- Validação operacional final: 3 deals de teste ponta a ponta (Qualificado → Live) antes de abrir para o time.

### Integrações esperadas (escopo do piloto)
- **Google Calendar** (2-way, via middleware) — sincronia de demos.
- **Odoo ERP** (webhook) — registro de oportunidade no Fechamento.
- **Asaas** (webhook) — emissão de boleto e confirmação de pagamento.

## 5. Audiência do PDD

**Lideranças internas Nexuz** — Walter Frey (Sponsor / Product Owner) + Caroline Oliveira (Dona da operação de Vendas).

---

Registrado em: 2026-04-16T16:59:48-03:00
Responsável pelo briefing: Walter Frey (sponsor comercial)
Pipeline run: 2026-04-16-165948
