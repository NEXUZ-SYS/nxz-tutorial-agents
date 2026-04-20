# Quality Criteria — Process Design Document (PDD)

Critérios duros (pass/fail) e rubrica de scoring usados pelo squad. Raquel Revisão aplica; demais agentes usam como auto-check.

## Rubrica de 10 dimensões (0-2 cada)

| # | Dimensão | 0 (ausente) | 1 (parcial) | 2 (completo) |
|---|----------|-------------|-------------|--------------|
| 1 | **Clarity** | Passos ambíguos ("o sistema", "alguém") | Legível com esforço | Inequívoco para novo operador |
| 2 | **Completeness** | Só happy path | Principal + 1 exceção | Principal + ≥ 3 exceções + edge cases |
| 3 | **Coherence** | Contradições entre diagrama/texto | Gaps menores | Handoffs simétricos, gateways exaustivos |
| 4 | **Feasibility** | Requer recursos inexistentes | Ajustes menores | Executável com papéis/dados atuais |
| 5 | **Controls** | Nenhum | Só preventivo manual | Preventivo + detectivo, layered |
| 6 | **Measurability** | Sem métricas | KPIs sem baseline/target | KPIs SMART completos |
| 7 | **Auditability** | Sem trilha | Log parcial | Audit trail + retenção declarada |
| 8 | **Exception handling** | Nenhum | Ad-hoc | Fail-safe + rollback + stop conditions |
| 9 | **Compliance (LGPD)** | Ignorada | Mencionada | Base legal + retenção + direitos mapeados |
| 10 | **Ownership & Governance** | Sem dono | Só dono | Dono + RACI + cadência de review |

**Threshold de aprovação:** total ≥ 14/20 **E** nenhuma dimensão < 1 **E** nenhuma SoD violation **E** nenhum LGPD crítico não atendido.

## Checklist duro (blocking antes de ir para revisão)

### Estrutura do PDD
- [ ] Cover block com nome, ID, owner, versão, approvers, effective date, review cadence
- [ ] Purpose statement em 1 parágrafo
- [ ] Scope explícito: in-scope, out-of-scope, trigger (start event), end events
- [ ] Swimlane narrativo com ≥ 1 lane por papel envolvido
- [ ] RACI matrix com 1 A por linha, ≥ 1 R por linha
- [ ] Inputs & outputs table: cada atividade tem artefatos nomeados
- [ ] Business rules numeradas (BR-nnn), cada uma ligada a uma atividade
- [ ] KPIs SMART: fórmula, unidade, baseline, target, threshold, cadência, owner, fonte
- [ ] SLAs por atividade crítica (duração + consequência de breach)
- [ ] Risk & control matrix: cada risco ≥ 1 controle mapeado
- [ ] Exceções: ≥ 3 cenários nomeados com handler, SLA, escalação
- [ ] Glossary com termos de negócio do processo
- [ ] Change log + revisor

### Qualidade de conteúdo
- [ ] **Tool-agnostic:** nenhuma marca de software citada
- [ ] **Voz ativa:** papel nomeado + verbo + objeto
- [ ] **Happy path + ≥ 3 exceções**
- [ ] **Base legal LGPD** declarada para dados pessoais tocados no processo
- [ ] **Retenção** mapeada para cada dado pessoal
- [ ] **Direitos do titular** com fluxo de resposta em 15 dias
- [ ] **SoD check:** nenhum papel executa request + approval + payment/release

### Governança
- [ ] Process owner nominado com papel formal
- [ ] Cadência de review definida (mínimo trimestral para processos críticos)
- [ ] Controles preventivos + detectivos em pontos de risco financeiro/regulatório
- [ ] Four-eyes em transações materiais (valor ou risco acima do threshold)

## Veto Conditions (rejeição automática)

Reprovar imediatamente se **qualquer** condição abaixo for verdadeira:
1. Qualquer marca de software citada no documento (tool contamination).
2. Linha do RACI sem A, ou com 2+ As.
3. KPI sem target ou sem método de medição.
4. Processo toca dado pessoal e não declara base legal LGPD.
5. Atividade crítica sem dono identificado.
6. Nenhum caminho de exceção modelado.
7. SoD violation em transação financeira/regulatória material.
8. Documento descreve "telas", "botões" ou "campos de sistema" ao invés de capabilities.
