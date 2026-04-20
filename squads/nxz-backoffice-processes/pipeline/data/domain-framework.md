# Domain Framework — do briefing ao PDD aprovado

Framework operacional que o squad aplica em todas as execuções. Leitura obrigatória para todos os agentes.

## Fase 0 · Coleta de contexto (checkpoint inicial)
Perguntas obrigatórias ao usuário no step-01:
1. **Demanda bruta** — descreva em texto livre o que precisa ser resolvido.
2. **Área impactada** — qual área/squad é dona do processo (Financeiro, Ops, CS, Vendas, Produto, Contábil, Compras, Jurídico, etc.)? Quais áreas são afetadas downstream?
3. **Contextos adicionais** — anexos, links, documentos, SLAs vigentes, regras que já existem, histórico de tentativas.
4. **Audiência do PDD** — quem vai executar/aprovar o desenho (lideranças, time BPO, consultoria para cliente).

Nada prossegue até estes 4 campos estarem preenchidos.

## Fase 1 · Análise do briefing (Ana Análise)
Entregáveis:
- **Problem Statement** — 1 frase, sintoma-based, sem solução embutida.
- **Stakeholders** — mapa com papéis: sponsor, process owner, executores, beneficiários, adjacentes.
- **SIPOC** — tabela completa (Suppliers, Inputs, Process [5-7 macro-steps], Outputs, Customers).
- **AS-IS narrativo** — como o processo acontece hoje (mesmo que seja informal).
- **Pain points quantificados** — volume, cycle time, erro, custo, exposição regulatória.
- **5 Whys** — pelo menos 1 cadeia de causa raiz resolvida.
- **Gaps** — lista de perguntas de descoberta ainda não respondidas, usando o banco de 25+ perguntas.
- **Constraints** — legal, fiscal (inclui LGPD), budget, calendário, out-of-scope.
- **Risks & assumptions** — hipóteses que podem invalidar o desenho.
- **Success criteria (TO-BE)** — critérios SMART com baseline e target.

## Fase 2 · Gap resolution (checkpoint)
Ana Análise identifica o que falta. O usuário responde pergunta a pergunta (ou anexa documentos). Nada prossegue sem fechamento dos gaps críticos.

## Fase 3 · Mapeamento de fluxo (Mário Mapeador)
- **AS-IS swimlane narrativo:** 1 lane por papel, verbo-objeto por atividade, gateways explícitos para decisões, handoffs simétricos, exceções modeladas (mínimo 3).
- **TO-BE swimlane narrativo:** redesenho eliminando waste, consolidando handoffs, automatizando checks manuais, adicionando controles. Sem citar ferramentas — descrever **capability** ("validação automatizada de CNPJ"), não "sistema X".
- **Tabela de rastreabilidade as-is → to-be** — cada atividade nova é justificada e cada atividade removida é explicada.
- **Coherence check:** handoffs simétricos, gateways mutuamente exclusivos, sem orphan steps, sem loops sem saída.

## Fase 4 · Design do PDD (Paula Processo)
Documento final com TODAS as seções:
1. Cover block
2. Purpose & scope
3. Swimlane narrativo (do Mário)
4. RACI matrix
5. Inputs & outputs table
6. Business rules (BR-nnn)
7. KPIs (SMART) + SLAs
8. Risk & control matrix
9. Exception & escalation playbook
10. Glossary / data dictionary
11. Change log + governance (owner, versão, cadência)

## Fase 5 · Aprovação do design (checkpoint)
Usuário lê o PDD e aprova / solicita ajustes.

## Fase 6 · Revisão de governança (Raquel Revisão)
Aplica a rubrica de 10 dimensões (0-2 cada, 20 pts). Emite verdict:
- **APROVADO** (≥ 14/20, nenhuma dimensão < 1, nenhuma SoD violation)
- **APROVADO COM CONDIÇÕES** (14-17, com blocking items listados)
- **REJEITADO** (< 14 ou SoD violation ou LGPD crítico) → loop para Paula Processo

Checklist obrigatório: SoD, fail-safe paths, LGPD by design, controles preventivos + detectivos em pontos de risco.

## Fase 7 · Aprovação final (checkpoint)
Usuário valida o veredicto e decide: publicar, iterar ou arquivar.

## Princípios não-negociáveis
- **Tool-agnostic sempre.** Jamais nomear software (SAP, Odoo, ClickUp, Notion, Jira, etc.). Descrever capability + papel.
- **Happy path + exceções.** Mínimo 3 caminhos de exceção modelados.
- **Evidência antes de desenho.** Nenhum TO-BE sem AS-IS ou problem statement justificado.
- **Dono nominado.** Nenhum processo aprovado sem process owner e RACI completo.
- **Mensurabilidade.** Todo KPI tem baseline, target, cadência, dono, fonte.
- **LGPD by design.** Todo processo que toca dados pessoais mapeia base legal, retenção e direitos do titular.
- **SoD obrigatória** em transações materiais.
