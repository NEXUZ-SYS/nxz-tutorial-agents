# Squad Memories — nxz-backoffice-processes

## Run 2026-04-16-165948 — Ciclo Comercial de Vendas Nexuz

### Decisões do Sponsor
- 2026-04-17 · decisão · Sponsor solicitou detalhamento dos checklists F3-F6 (estavam genéricos no PDD v0.1). Gerou v0.2.
- 2026-04-20 · decisão · Sponsor solicitou incorporação de 14 diferenças entre o Excel de referência (processo-comercial-NXZ.xlsx v2.1) e o PDD. Gerou reescrita completa v0.3.
- 2026-04-20 · decisão · Sponsor aprovou PDD v0.3 no Step 06 (aprovação do design) e publicou como v1.0 no Step 08 (aprovação final).

### Aprendizados do Processo
- 2026-04-17 · processo · O briefing original não incluía a planilha Excel v2.1 como input. A planilha continha detalhes cruciais (Modelo de Dados, Marcos POD, 9 Motivos de Descarte, Cadências detalhadas, Precificação, SLAs de Entrada) que o pipeline não capturou nos Steps 01-05. Aprendizado: sempre perguntar ao Sponsor se há documentos de referência adicionais antes de iniciar o design.
- 2026-04-17 · processo · Checklist Binário (6 itens humanos) é o modelo correto de qualificação — NÃO Lead Score automatizado. O PDD original assumiu agente de qualificação automatizada que não existe.
- 2026-04-17 · processo · WhatsApp é canal principal de contato com lead, não e-mail. E-mail é backup/automação.
- 2026-04-17 · processo · Nutrição é pipe paralelo (não linear), com card NOVO ao reaquecer (nunca reabre o antigo).
- 2026-04-17 · processo · "Descarte" é o termo correto (não "Perdido") — com 9 motivos estruturados.

### Resultado da Revisão
- 2026-04-20 · revisão · Raquel Revisão: APROVADO COM CONDIÇÕES — 16/20. Zero blocking issues. 8 recomendações non-blocking. Dimensões com score 1: KPIs SMART (baselines ausentes) e LGPD (LIA/DSAR/DPAs pendentes). Score potencial pós-condições: 18/20.

### Condições pós-publicação
- D+30: Calibrar baselines de KPIs com dados reais; definir threshold e ação em breach para metas Top-line e Alavanca; completar LIA e ativar canal DSAR.
- D+60: Assinar DPAs com operadores.
- D+90: Primeiro review trimestral; re-score do PDD (target: 18/20); plano de desacúmulo de papéis da Gestão.
