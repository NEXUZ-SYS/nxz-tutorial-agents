# Review Verdict — Ciclo Comercial de Vendas Nexuz (Food Service)

## Veredito
**APROVADO COM CONDIÇÕES** — Score: 16/20

PDD v0.3 é um documento maduro, com estrutura completa (20 seções), modelo de dados robusto (Conta/Contato/Deal), RACI validado (30 atividades, 5 departamentos) e LGPD tratada com seriedade. As condições referem-se a: (1) ausência de baselines mensurados — todos os KPIs têm targets "ilustrativos/exemplo" sem dados reais, o que impede verificação SMART completa; (2) acúmulo de papéis na Gestão (admin + auditor + aprovador + contrato) com controle detectivo insuficiente (auto-auditoria); (3) LIA para legítimo interesse e canal DSAR ainda não implementados (workstreams paralelos declarados mas sem prazo firme).

## Score Summary (10 Dimensões)

| # | Dimensão | Score 0-2 | Observação |
|---|---|---|---|
| 1 | Problem-Solution Fit (Clarity) | 2 | Seção 1: Problem Statement claro com 4 dores nomeadas (a-d). Propósito em 1 parágrafo. Voz ativa com papel nomeado + verbo + objeto em todas as 30 atividades do RACI (seção 4). Zero ocorrências de "alguém" ou "o sistema" genérico. |
| 2 | Escopo & Owner (Completeness) | 2 | Seção 1: in-scope detalhado (14 itens), out-of-scope (6 itens), trigger (3 origens), end events (2 terminais). Cover block completo com Process Owner (Caroline Oliveira), Sponsor (Walter Frey), Approvers, Review Cadence trimestral, Effective Date condicional. Happy path + 6 exceções + edge cases (DSAR, reagendamento 3x, nutrição expirada, no-show, precificação, duplicidade CNPJ). |
| 3 | Swimlane Coerente (Coherence) | 2 | Seção 2: 7 raias nomeadas, 11 gateways (GT-01 a GT-11) com critérios mutuamente exclusivos e ramos SIM/NÃO. Handoffs simétricos verificados: T-21 (GANHO) gera registro em Relacionamento (T-22) com link bidirecional (R38). Modelo de Dados (seção 3) com cardinalidades explícitas (1:N, 1:1, N:1). Checklists de transição (seção 5A) com 5 gates detalhados (F-Entrada, F-Demo, F-Proposta, F-Fechamento, F-GANHO). |
| 4 | RACI Válido | 2 | Seção 4: 30 atividades × 6 colunas. Validação explícita: 30/30 com exatamente 1 A, 30/30 com >= 1 R. SoD verificado: T-15 (Ops coordena) vs T-17 (Financeiro executa pagamento) vs T-16 (Gestão executa contrato). Four-eyes em desconto > 15% (T-20: Ops propõe C, Gestão aprova R/A). Nenhum papel apenas com I's. Gargalo Vendas (22/30) documentado com mitigação v2. |
| 5 | KPIs SMART | 1 | Seção 8: 16 métricas em 3 camadas (Top-line/Alavanca/Diagnóstico) com fórmula, unidade, target, cadência, owner, fonte e ação em breach. **Porém**, TODOS os baselines = "NÃO INFORMADO" e targets declarados como "exemplo/ilustrativo, a calibrar em 30-60 dias". Sem baseline medido, target é projeção sem ancoragem (anti-pattern #5 "Sem baseline" e KPI Design Guide: "Sem baseline, target é chute"). Threshold e stretch bands ausentes para a maioria das métricas. NON-BLOCKING porque o documento reconhece explicitamente a lacuna e define prazo de calibração (D+30 a D+90). |
| 6 | SLAs Definidos | 2 | Seção 9: 3 SLAs de Entrada (Marketing->Vendas, Indicação->Vendas, Outbound interno) com volume, qualidade, tempo e feedback. Seção 10: 17 SLAs Internos por etapa com duração, gatilho de violação e escalação. Consequências de breach definidas (alertas, decisão Nutrição/Descarte, descarte automático D+67). |
| 7 | Risk & Control | 2 | Seção 11: 12 riscos (R-01 a R-12) com probabilidade, impacto, controle, tipo (preventivo/detectivo), frequência e owner. Mix de controles preventivos (gates, bloqueios, Checklist Binário, validação CNPJ) e detectivos (dashboards, alertas, revisão semanal/trimestral). R-11 documenta honestamente o acúmulo de papéis na Gestão com plano de segregação. |
| 8 | LGPD | 1 | Seção 17: Base legal mapeada por dado pessoal (9 campos) e por canal de captação (3 canais) com artigos da LGPD. Retenção definida (12 meses descarte, contrato + 5 anos fiscal). Direitos do titular cobertos (acesso, correção, exclusão, portabilidade) com prazo de 15 dias. **Porém**: (a) LIA (Legitimate Interest Assessment) para Outbound e Indicação declarada como "workstream paralelo" sem prazo — sem LIA documentada, a base legal de legítimo interesse é formalmente vulnerável; (b) canal DSAR "a ser criado" (dpo@nexuz.com.br) — sem canal operacional, o atendimento ao titular é precário; (c) DPAs com operadores "NÃO ASSINADOS" — risco regulatório reconhecido mas não mitigado antes do piloto. NON-BLOCKING individualmente (piloto = validação operacional, não produção), mas o conjunto reduz o score. |
| 9 | Exceções Modeladas | 2 | Seção 12: 6 exceções nomeadas (EXT-01 a EXT-06) com trigger, handler, SLA, tratamento, escalação e critério de resolução. Cobrem: oportunidade ociosa, pagamento pendente, contrato pendente, DSAR, reagendamento excessivo, nutrição expirada. Todas com handler humano ou automação + SLA + escalação definida. Supera o mínimo de 3 exigido pela rubrica. |
| 10 | Tool-Agnostic | 2 | Zero marcas de software no documento (verificado por busca textual). Terminologia consistente: "repositório instrumentado" para a ferramenta de CRM/pipeline, "capability automatizada" para automações, "planilha de precificação externa" para pricing. Nunca menciona telas, botões ou campos de sistema. Descreve capabilities, papéis, dados e decisões. |

**Total: 16/20**

## Governance Checks

- **SoD:** PASS — Separação clara entre solicitação, aprovação e execução em transações materiais. T-15 (Ops coordena fechamento) vs T-17 (Financeiro emite cobrança e confirma pagamento, R/A) vs T-16 (Gestão emite contrato e coleta assinatura, R/A). Desconto > 15%: Ops propõe (C), Gestão aprova (R/A) — GT-11. **Ressalva documentada (R-11):** Gestão acumula admin + auditor + aprovador de desconto + contrato no piloto, com mitigação planejada (segregar admin para Desenvolvimento). Aceitável para operação solo/piloto com controle detectivo (dashboard transparente + revisão trimestral).
- **Fail-safe:** PASS — Todas as 6 exceções possuem handler + SLA + escalação. Gates de transição com bloqueio preventivo automático (campos obrigatórios vazios = bloqueio). Descarte automático D+67 como stop condition para Nutrição. Motivo de descarte obrigatório com bloqueio (R25). Oportunidades ociosas além do SLA geram alerta com escalação semanal.
- **LGPD:** PASS (condicional) — Base legal, retenção e direitos mapeados para todos os dados pessoais. Passa formalmente porque o documento é um PDD de piloto (validação operacional), não go-live em produção. Contudo, 3 itens pendentes devem ser resolvidos antes do go-live produtivo: (1) LIA documentada para legítimo interesse; (2) canal DSAR operacional; (3) DPAs assinados com operadores.

## Blocking Issues

Nenhum. O documento não apresenta violações de veto:
- Zero brand names (verificado por busca)
- RACI com 1 A por linha (30/30)
- KPIs com target e método de medição (todos com fórmula, fonte e cadência, mesmo que targets sejam ilustrativos)
- Base legal LGPD declarada para todos os dados pessoais
- Todas as atividades críticas com dono identificado
- 6 exceções modeladas (mínimo 3)
- Zero SoD violations em transações materiais
- Zero descrições de telas/botões/campos de sistema

## Non-Blocking Recommendations

1. **[KPIs] Calibrar baselines nos primeiros 30 dias (D+30)** — Todos os 16 KPIs têm targets "ilustrativos". Recomendação: no review D+30, substituir TODOS os targets por valores ancorados em dados reais. Prioridade: MT-01 (MRR), MD-01 (Win Rate), MD-02/MD-03 (Ciclo médio QS/FS). Definir threshold e stretch bands para cada KPI conforme KPI Design Guide. *(Seção 8, anti-pattern #5)*

2. **[KPIs] Adicionar threshold e ação em breach para metas Top-line e Alavanca** — As métricas de Diagnóstico (MD-01 a MD-10) têm "Ação em breach", mas as metas Top-line (MT-01 a MT-03) e Alavanca (MA-01 a MA-03) não especificam o que fazer quando o threshold é quebrado. Alinhar com KPI Design Guide (campo obrigatório: "O que fazer se ultrapassar threshold?"). *(Seção 8.1, 8.2)*

3. **[LGPD] Definir prazo firme para LIA, canal DSAR e DPAs** — Atualmente declarados como "workstream paralelo" sem data. Recomendação: incluir datas-alvo no roadmap 30/60/90 (seção 18). Sugestão: LIA e canal DSAR até D+30; DPAs até D+60, ambos antes de go-live produtivo. *(Seção 17)*

4. **[Risk] R-11 — Plano de desacúmulo da Gestão** — Acúmulo de admin + auditor + aprovador + contrato na mesma pessoa (Walter) é risco de SoD em operação madura. O controle detectivo atual (auto-auditoria) é fraco — quem audita a si mesmo tem conflito inerente. Recomendação: na revisão trimestral D+90, segregar pelo menos admin para Desenvolvimento e auditor para papel independente (ou Carol, se contratação SDR liberar capacidade). *(Seção 4, R-11)*

5. **[Modelo de Dados] Considerar campo "Probabilidade de fechamento"** — O glossário define "Forecast ponderado = Valor proposto x probabilidade de fechamento", mas o campo "Probabilidade" não consta no modelo de dados do Deal (seção 3.3). Sem ele, o forecast ponderado citado no PDD é incalculável. *(Seção 3.3, Glossário)*

6. **[Precificação] R17 — Margem sem teto em v1** — "Sem teto de aprovação em v1 (exceto desconto > 15%)" significa que Ops pode aplicar margem de 0% ou 500% sem aprovação. Risco baixo com Carol solo, mas recomenda-se definir faixa aceitável (ex.: 0-30%) com aprovação Gestão fora da faixa. *(Seção 15, R17)*

7. **[Cadências] Horário de contato sábado** — R36 proíbe domingos e horários antes das 8h/após 21h, mas não menciona sábados explicitamente. Clarificar se sábado é permitido (janela reduzida?) ou proibido. *(R36, seção 5)*

8. **[Inputs/Outputs] Falta artefato "Proposta PDF consultiva"** — Seção 16 lista "Proposta comercial" como output genérico, mas R14 distingue QS (mensagem simples) e FS (PDF consultivo com diagnóstico, rollout e data de resposta). Considerar detalhar o template/conteúdo mínimo do PDF FS na tabela de Inputs/Outputs ou como anexo. *(Seção 16, R14)*

## Re-Score Plan

| Condição | Score atual | Score possível | Ação necessária |
|---|---|---|---|
| KPIs com baselines reais e threshold/stretch bands | 1 | 2 | Calibrar baselines com 30-60 dias de dados; adicionar threshold e ação em breach para Top-line e Alavanca |
| LGPD com LIA documentada + canal DSAR operacional + DPAs assinados | 1 | 2 | Completar LIA, ativar canal DSAR, assinar DPAs — tudo antes do go-live produtivo |
| **Score potencial após condições** | **16** | **18** | Revisão no D+90 (primeiro review trimestral) |

---

**Revisora:** Raquel Revisão (Governance Reviewer, squad nxz-backoffice-processes)
**Data da revisão:** 2026-04-17
**Próximo review:** D+90 do go-live (conforme cadência trimestral definida no Cover block)
