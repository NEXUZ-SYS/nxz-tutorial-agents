---
type: checkpoint
inputFile: squads/nxz-pipefy-setup/output/pipe-design.md
---

# Step 05: Aprovação do Design

## Contexto
O arquiteto Paulo traduziu o PDD em um design completo para o Pipefy,
incluindo pipes, phases, fields, automações, connectors e estimativa de quota.

## Perguntas

### O design dos pipes está alinhado com o processo comercial?
Revise o documento de design gerado, comparando com o PDD.

1. Aprovado — design fiel ao PDD, pode configurar
2. Ajustes menores — precisa corrigir: (especifique)
3. Ajustes maiores — requer redesign de: (especifique)
4. Reprovado — abordagem incorreta

### A estimativa de quota de automações está aceitável?
O plano Business permite 300 automation jobs/mês.

1. Dentro do limite — prosseguir com Business
2. Acima do limite — preciso avaliar Enterprise
3. Muito acima — simplificar automações para caber no Business
