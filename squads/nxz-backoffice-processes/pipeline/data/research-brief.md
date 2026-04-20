# Research Brief — Backoffice Process Design

> Compilação da pesquisa de 4 domínios que alimentam o squad. Sempre **tool-agnostic**: fala de papéis, dados, decisões e controles — nunca telas ou marcas.

## Domínio A — Business Process Management (BPM)

### Frameworks de mapeamento
- **BPMN (Business Process Model and Notation):** linguagem gráfica com pools, lanes, events, activities, gateways, fluxos de sequência/mensagem.
- **SIPOC:** diagrama de escopo de alto nível (Suppliers–Inputs–Process–Outputs–Customers) usado antes de detalhar.
- **Swimlane / cross-functional:** uma raia por papel/área; expõe handoffs e gaps de ownership.
- **Value Stream Mapping (VSM):** traça fluxo de materiais + informação com cycle/wait time e value-add ratio por passo.
- **As-Is vs To-Be:** documenta realidade atual primeiro, depois redesenha estado futuro com metas mensuráveis.
- **Process Architecture (camadas):** Estratégica (value chain) → Operacional (SIPOC) → Execução (swimlane/BPMN).
- **Six Sigma DMAIC:** Define-Measure-Analyze-Improve-Control.
- **Lean waste (TIMWOODS):** Transport, Inventory, Motion, Waiting, Over-processing, Over-production, Defects, Skills.

### Metodologia de mapeamento (demanda → processo)
1. Framear a demanda: problema, sponsor, escopo (start/end event), critérios de sucesso.
2. Montar o SIPOC: fornecedores, entradas, 5-7 macro-etapas, saídas, clientes.
3. Descobrir o AS-IS com quem executa: entrevistas, shadowing, artefatos (formulários, logs).
4. Desenhar swimlane AS-IS: 1 lane por papel, verbo-objeto por atividade, gateways explícitos.
5. Validar por walk-through: replay com operadores; reconciliar variantes e workarounds.
6. Diagnosticar: pain points, rework loops, gaps de controle; quantificar cycle time, first-pass yield.
7. Desenhar o TO-BE eliminando waste; manter tabela de rastreabilidade as-is → to-be.
8. Publicar + governar: aprovar com process owner, versionar, atribuir KPIs e cadência de review.

## Domínio B — Process Design & Documentation

### Artefatos padrão de um PDD
- Cover block (nome, ID, owner, versão, aprovadores, effective date, review cadence)
- Purpose & scope (objetivo, in/out of scope, trigger, end events)
- Swimlane / BPMN (happy path + exceções)
- RACI matrix
- Inputs & outputs table
- Business rules register (IF…THEN…ELSE, numeradas BR-nnn)
- KPIs (SMART) + SLAs
- Risk & control matrix (preventivo/detectivo)
- Exception & escalation playbook (L1→L2→L3)
- Glossary / data dictionary
- Change log

### Regras de escrita
- **RACI:** exatamente 1 A por atividade; ≥1 R; linhas sem A são blocker.
- **Business rule:** atômica, testável, numerada, ligada à atividade que a aplica.
- **KPI SMART:** definição, fórmula, unidade, baseline (8-12 semanas), target/threshold/stretch, dono, fonte, cadência, gatilho de ação.
- **SLA:** duração + relógio (business/calendar) + consequência de breach + rota de escalação.
- **Risk & control:** risco → controle → tipo → owner → frequência → risco residual.
- Sempre voz ativa, papel nomeado, critério de aceite explícito.

## Domínio C — Business Analysis & Briefing

### Frameworks de elicitação
- **BABOK v3:** Elicitation and Collaboration (Prepare, Conduct, Confirm, Communicate).
- **5 Whys:** root-cause laddering (4-5 níveis até causa estrutural, não pessoal).
- **Stakeholder mapping:** Power/Interest grid, RACI, onion diagram.
- **Problem Statement Canvas:** quem afeta — qual problema — quando/onde — impacto — workaround atual.
- **Job-To-Be-Done (JTBD):** "quando [situação], quero [motivação], para [resultado]".
- **Kano / MoSCoW:** priorização de requisitos.

### Metodologia de briefing (10 passos)
1. Framear o problema em 1 frase (sintoma, não solução).
2. Mapear stakeholders (sponsor, dono, executor, beneficiário, adjacentes).
3. Delimitar escopo via SIPOC.
4. Percorrer o AS-IS com quem executa.
5. Descer em 5 Whys para cada dor.
6. Quantificar: volume, frequência, tempo/instância, erro, impacto financeiro, exposição regulatória.
7. Definir critérios de sucesso TO-BE (SMART).
8. Surfacelar constraints (legal, fiscal, budget, calendário).
9. Listar riscos e premissas.
10. Read-back e sign-off do sponsor.

## Domínio D — Process Review & Governance

### Rubrica (10 dimensões, 0-2 cada, 20 pts totais)
Clarity · Completeness · Coherence · Feasibility · Controls · Measurability · Auditability · Exception handling · Compliance (LGPD) · Ownership & Governance.
Pass ≥ 14/20, nenhuma dimensão < 1.

### Governança core
- **LGPD (Lei 13.709/2018):** base legal (art. 7 ou 11), minimização, propósito, retenção, direitos do titular (15 dias), notificação à ANPD.
- **Auditabilidade:** log de actor + timestamp + record id + action + source; registro de incidentes retido ≥ 5 anos.
- **Segregation of Duties (SoD):** request/approve, record/reconcile, custody/record, vendor master/payment release.
- **COSO controls:** preventive + detective + corrective; manual vs automated.
- **Four-eyes** em transações materiais; change control em edições do processo.

### Continuous improvement
- **PDCA:** Plan-Do-Check-Act com baseline e piloto delimitado.
- **Kaizen:** melhoria pequena, diária, sobre standard work existente.
- **Standard-then-improve:** "no standard, no kaizen".
- **Cadência:** health check trimestral, redesign anual.

## Fontes principais
- IIBA BABOK v3 — Elicitation and Collaboration
- OMG — BPMN 2.0 Specification
- COSO — Internal Control Framework
- ASQ — PDCA Cycle
- Lean Enterprise Institute — Kaizen
- LGPD (Lei 13.709/2018)
- Project Management Institute — RACI guidelines
- Six Sigma DMAIC references

> **Princípio transversal:** todo artefato deste squad é **tool-agnostic**. Nunca citar marcas de software. Descrever capability, não produto.
