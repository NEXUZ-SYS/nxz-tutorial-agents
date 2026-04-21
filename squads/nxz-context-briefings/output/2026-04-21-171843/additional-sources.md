# Fontes Adicionais de Contexto

## Fontes Fornecidas

### Fonte 1 — PDD Backoffice (Processo de Vendas)
- **Tipo:** arquivo_local
- **Referência:** `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md`
- **Foco:** Processo canônico de vendas da Nexuz (agnóstico de ferramenta). Etapas, responsáveis, SLAs, entregáveis, critérios de avanço de fase. Usar como ESPINHA DORSAL do playbook.

### Fonte 2 — Design do Pipe Pipefy (nxz-pipefy-setup)
- **Tipo:** arquivo_local (múltiplos)
- **Referência:** `squads/nxz-pipefy-setup/output/2026-04-20-162723/v1/`
  - `pipe-design.md` — Design de fases, campos, conexões do pipe
  - `pipefy-crm-reference.md` — Referência de CRM no Pipefy
  - `research-findings.md` — Findings da pesquisa
  - `design-decisions.md` — Decisões de arquitetura do pipe
  - `configuration-log.md` — Log de configuração aplicada
  - `specs/01-databases.json` → `07-email-templates.json` — Specs da instância
- **Foco:** Materializar as etapas do PDD em práticas operacionais, mostrando QUAIS campos preencher em cada fase, quais templates de email, quais automações disparam, e quais conexões entre DBs (Clientes / Contatos / Oportunidades).

## Instruções de Priorização

1. O playbook deve ser **agnóstico de ferramenta no conteúdo de venda** (roteiros, perguntas, objeções), mas **aterrar cada etapa no que o SDR/Closer faz no Pipefy** (ação concreta: mover card, preencher campos, disparar template).
2. Cada etapa = uma seção com: Objetivo / O que checar / Roteiro / Critério de avanço / Ação no Pipefy / Templates.
3. Usar BANT + SPIN como frameworks de apoio, ajustando ao ICP Nexuz (Food Service brasileiro).
4. Qualificação: foco em separar lead frio/morno/quente o mais cedo possível.
5. Fechamento: foco em objeções recorrentes de Food Service (preço, migração, treinamento, multi-unidade) e gatilhos de urgência aceitáveis.
