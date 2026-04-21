# Configuração do Briefing

**Produto:** Suíte Nexuz (ERP, Go, KDS, Delivery, Pay Go) — enfoque comercial na venda da suíte
**Público-Alvo:** Sales (com foco no time de Sales-Ops / Ops comercial da Nexuz)
**Nível Organizacional:** Operacional
**Objetivo:** Playbook de vendas (qualificação + fechamento) para auxiliar o time de Ops comercial no dia-a-dia — roteiros, critérios de qualificação, condução de reunião, objeções, templates e checklist de fechamento, alinhado ao processo PDD do backoffice e ao pipeline Pipefy já configurado.
**Data:** 2026-04-21
**Execução:** 2026-04-21-171843 / v1

## Defaults aplicados (sem re-perguntar ao usuário)

Com base nos args do comando (`playbook de vendas qualificação/fechamento para tipo de ops da nxz` + referências explícitas), o escopo foi inferido automaticamente:

- "vendas" → público Sales
- "ops da nxz" → Sales-Ops (quem operacionaliza o funil de vendas internamente), não Ops técnico (Dev/QA/Ops)
- "qualificação/fechamento" + "auxiliar" → nível Operacional (execução diária)
- Produto: Suíte completa, já que os dois materiais de referência tratam do processo de venda agnóstico da suíte

## Fontes de referência declaradas pelo usuário

1. `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` (PDD do processo de vendas)
2. `squads/nxz-pipefy-setup/output/2026-04-20-162723/v1/` (design do pipe, CRM reference, specs, research findings)

## Nota

KDS NÃO é um modo do NXZ Go — é um sistema de cozinha separado. Não incluir como "modo".
