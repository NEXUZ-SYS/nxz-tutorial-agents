---
name: Squad FAQ Chatwoot — contexto e decisões de produto
description: Squad periódico que extrai tickets do Chatwoot, gera FAQs por produto/categoria, testa o agente de IA via Playwright Playground, e publica no Help Center via chatwoot-publish
type: project
---

Squad: `nxz-faq-chatwoot`

**Objetivo:** Gerar e manter FAQs automaticamente a partir do histórico de suporte do Chatwoot, validar que o agente de IA as utiliza corretamente, e publicar no Help Center para reduzir suporte N1 em 80%.

**Versão atual do fluxo:** v3 — com checkpoint de tópicos antes da geração + validação Playwright de caminhos de menu (12 etapas)

**Fluxo aprovado (v3 — 12 etapas):**
1. checkpoint-config — configuração inicial da rodada
2. extract-tickets — coleta tickets resolvidos por produto; output: `tickets_raw.json`
3. analyze-patterns — agrupa por tema, ranqueia por frequência, detecta lacunas; output: `pattern-report.md` + `topics-to-generate.json`
4. **checkpoint-topics** (NOVO) — Carol aprova QUAIS FAQs serão geradas antes do writer começar; output: `approved-topics.json`
5. generate-faqs — writer gera artigos apenas para tópicos aprovados; para e pergunta ao usuário se precisar de caminhos de menu sem acesso; output: `faqs_index.md` + artigos em `output/faqs/`
6. **validate-navigation** (NOVO) — valida via Playwright cada caminho de menu nos artigos gerados; para e pergunta ao usuário se não tiver acesso ao produto; output: `navigation-validation-report.md` + screenshots
7. prepare-tests — seleciona até 20 perguntas representativas para teste; output: `test_plan.json`
8. run-playground-tests — testa agente de IA no Playground do Chatwoot; output: `test_results.json` + `test_report.md` + screenshots
9. notify-reviewer — notifica Carol via Telegram
10. checkpoint-review — Carol revisa FAQs + relatório de navegação + relatório de testes; artigos com `navigation_validated: false` aparecem como REQUER_REVISAO_NAVEGACAO
11. publish-faqs — publica FAQs aprovadas; output: `publication_results.json`
12. generate-report — consolida métricas e comparativo com rodada anterior; output: `execution_report.md` + `run_metrics_history.json`

**Decisão de design (teste antes da publicação):** O teste ocorre ANTES da publicação. O objetivo é medir o estado atual do agente para evidenciar o delta de melhoria no próximo ciclo. Carol vê o "antes", aprova as FAQs, e o ciclo seguinte mostrará o "depois".

**Decisão: preparação de teste separada (Etapa 7):** A curadoria das perguntas de teste é uma etapa explícita. Permite critérios de seleção claros (frequência + cobertura de produto + tópicos novos) e critérios de avaliação por pergunta definidos antes do teste.

**Decisão: checkpoint-topics antes do writer (v3):** Carol aprova a lista de tópicos ANTES da geração. Evita desperdício de geração e garante que só entra na fila conteúdo que Carol considera útil. Tópicos com ESCALAR_LUIZ ficam em `pending-escalations.json` e aparecem como pendências no relatório seguinte.

**Decisão: validação Playwright de navegação (v3):** O writer é proibido de inventar caminhos de menu. Se não tiver acesso ao produto, para e pergunta ao usuário com três opções: (a) fornecer caminhos manualmente, (b) dar acesso para validação, (c) gerar sem instruções de navegação. Artigos sem validação de navegação recebem `navigation_validated: false` e aparecem no checkpoint de revisão como REQUER_REVISAO_NAVEGACAO. Motivação: na rodada anterior o writer inventou "Configuracoes > Ponto de Venda > Impressora" que não existe no NXZ ERP.

**Taxa de acerto ponderada:** `(ACERTOU + PARCIAL * 0.5) / total_respondidas * 100`

**Decisões sobre os testes:**
- Máximo de 20 perguntas por rodada (hardcoded no YAML)
- Classificação de 4 níveis: ACERTOU, PARCIAL, GENÉRICO, ERROU + TIMEOUT para falhas de tempo
- Timeout por pergunta: 30s padrão, até 60s configurável no YAML
- Perguntas com timeout registradas como TIMEOUT, não interrompem o fluxo
- Mínimo de 3 perguntas respondidas para resultado válido; abaixo disso, aviso mas fluxo continua
- LLM como juiz das classificações — justificativa de 1-2 frases obrigatória por pergunta
- Seletores Playwright: semânticos (aria-label, texto visível) — nunca seletor por classe CSS
- Se o Playground falhar (health-check), aborta apenas a Etapa 5 e entrega FAQs sem relatório, notificando Carol

**Validadora:** Carol Oliveira
- Decisões possíveis por artigo: APROVADO, APROVADO_COM_EDICAO, REJEITADO, ESCALAR_LUIZ
- Artigos com `needs_expert_review: true` são sinalizados para que Carol acione o Luiz Claudio
**Referência de conhecimento N1:** Luiz Claudio (escalado por Carol quando conteúdo técnico está fora da sua área)

**Inboxes do Chatwoot (mapeamento real, verificado via API em 2026-03-27):**
- ID 19 — Relacionamento (Channel::Whatsapp) — RECOMENDADO para FAQ
- ID 21 — Suporte Nexuz (Channel::WebWidget) — RECOMENDADO para FAQ
- ID 11 — implantacao (Channel::Api) — incluir apenas se quiser FAQs de implantacao
- ID 20 — financeiro (Channel::Api) — NAO recomendado; cobrancas automatizadas

**Decisao: filtro por inbox_ids (nao channels_filter):** A pergunta #5 do checkpoint-config usa inbox_ids (IDs numericos reais do Chatwoot) em vez de channel_type generico. O run-config.md registra `inbox_ids: [19, 21]`. O step 02-extract-tickets filtra via `attribute_key: inbox_id` na API de filtros do Chatwoot. Motivacao: inboxes sao mais precisas que channel_type — duas inboxes do mesmo tipo (ex: duas WhatsApp) precisariam de filtro distinto.

**Frequência:** quinzenal (padrão inicial); ampliar para semanal após validação de qualidade
**Idioma:** pt_BR

**Categorias por produto:**
- NXZ ERP: Financeiro/Fiscal, Estoque/Compras, Vendas/PDV, Relatórios, Configuração/Acesso
- NXZ Go: Configuração de Cardápio, Pagamentos, Integração ERP, Problemas de Tela/Hardware
- NXZ KDS: Configuração de Estações, Integração com PDV, Alertas e Sons, Problemas de Conexão
- NXZ Delivery: Integrações (iFood/Rappi), Sincronização de Pedidos, Impressão, Status de Pedidos
- NXZ Pay Go: Configuração de Máquina, Erros de Transação, Reconciliação, Suporte ao Operador

**Threshold de geração de FAQ:** frequency >= 3 (configurável no YAML)
**Threshold de volume mínimo de tickets:** 10 conversas (abaixo disso, squad questiona se deve prosseguir)

**Controle de pendências:**
- O squad não inicia nova rodada se há FAQs pendentes de aprovação (configurável no YAML)
- Artigos com ESCALAR_LUIZ aparecem como pendências no relatório de execução da rodada seguinte

**Métrica principal de saúde:** taxa de acerto do agente de IA no Playground — otimizações devem maximizá-la

**Why:** FAQs geradas manualmente são caras, desatualizadas e não escalam. O Chatwoot já tem o conhecimento — só precisa ser extraído, estruturado, e validado automaticamente antes de Carol aprovar. A taxa de acerto mede se o investimento está gerando impacto real na qualidade do agente.

**How to apply:** Ao sugerir melhorias no squad, considerar o comparativo antes/depois como a narrativa central de valor. Cada rodada deve mostrar evolução mensurável na taxa de acerto.
