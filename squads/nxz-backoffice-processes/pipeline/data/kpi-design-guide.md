# KPI Design Guide — metrificação do processo

## Regra SMART para cada KPI

Um KPI só é válido se responder a **todas** as perguntas abaixo:

| Pergunta | Campo obrigatório |
|----------|-------------------|
| O que mede? | **Nome** do indicador |
| Como calcula? | **Fórmula** explícita |
| Em qual unidade? | **Unidade** (%, dias, R$, qty, etc.) |
| Qual é o estado atual? | **Baseline** (medido, 8-12 semanas) |
| Qual a meta? | **Target** |
| Acima de quê vira alerta? | **Threshold** |
| Quem é dono do KPI? | **Owner** (papel) |
| De onde vem o dado? | **Fonte** (registro/evento) |
| Com que frequência medimos? | **Cadência** |
| O que fazer se ultrapassar threshold? | **Ação / gatilho** |

Sem qualquer dos itens acima, o KPI **não vai ao PDD**.

## Tipos de KPI por categoria

### Eficiência / Tempo
- **Cycle time** — tempo médio do start ao end event.
- **Lead time** — tempo percebido pelo cliente (inclui filas).
- **First-pass yield** — % de casos que passam sem retrabalho.
- **Wait ratio** — tempo em espera / cycle time total.

### Qualidade
- **Taxa de erro** — defeitos / total.
- **Taxa de rejeição** — rejeitados / submetidos.
- **Taxa de rework** — retrabalhos / total.
- **Incident rate** — incidentes críticos / período.

### Volume
- **Throughput** — instâncias / unidade de tempo.
- **Backlog** — instâncias em aberto.
- **Aging** — distribuição de idade do backlog.

### Financeiros
- **Cost per transaction** — custo operacional / instância.
- **Recovery rate** — valor recuperado / valor exposto.
- **Write-off rate** — perdas / volume.

### Compliance / Risco
- **Control failure rate** — controles não executados / total de execuções esperadas.
- **Audit finding rate** — achados / auditoria.
- **SLA adherence** — atividades dentro do SLA / total.
- **SoD violations detectadas** — em testes periódicos.

## Design de metas

### Baseline
Coletar **8-12 semanas** de dados antes de definir target. Sem baseline, target é chute.

### Banding
Recomendado definir 3 bandas:
- **Target** — o que queremos atingir.
- **Threshold** — abaixo disso vira alerta.
- **Stretch** — aspiracional, bônus.

Exemplo:
```
Cycle time onboarding de fornecedor
- Baseline: 9 dias úteis (mediana últimas 12 semanas)
- Target: ≤ 5 dias úteis
- Threshold: 7 dias úteis (aciona escalação)
- Stretch: ≤ 3 dias úteis
```

### Cadência de medição
- **Operacional** — diária / semanal (executores + líder direto)
- **Tático** — mensal (gerência)
- **Estratégico** — trimestral (C-level / board)

## Armadilhas comuns

- **KPI sem método de medição** — "melhorar atendimento" ≠ KPI.
- **Target ilusionista** — sem baseline.
- **KPI sem dono** — ninguém olha.
- **Múltiplos KPIs conflitantes** — otimizar um piora outro sem trade-off declarado.
- **Coletar sem agir** — definir "gatilho de ação" quando threshold é quebrado.
- **ASAP, "rápido", "adequado"** — não são targets.

## Exemplo completo

```yaml
kpi_id: KPI-FIN-014-01
name: "Cycle time onboarding de fornecedor"
formula: "end_date − submission_date (em dias úteis)"
unit: "dias úteis"
baseline:
  value: 9
  period: "últimas 12 semanas (2026-01 a 2026-03)"
target: "≤ 5"
threshold: "7 (aciona escalação para Proc. Manager)"
stretch: "≤ 3"
owner: "Procurement Manager"
data_source: "Registro de requisições de fornecedor (campo timestamps)"
cadence: "Semanal (dashboard operacional) / Mensal (report executivo)"
action_on_breach:
  - "Threshold excedido por 2 semanas consecutivas → root-cause analysis"
  - "Threshold excedido por 4 semanas → review do processo (loop para Paula Processo)"
```
