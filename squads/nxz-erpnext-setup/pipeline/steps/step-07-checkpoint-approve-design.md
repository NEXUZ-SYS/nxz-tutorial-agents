---
type: checkpoint
inputFile: squads/nxz-erpnext-setup/output/erpnext-design-document.md
---

# Step 07: Aprovação do Design (EDD)

## Contexto
Paulo traduziu a entrevista + pesquisa em um Design Document completo com
camadas, JSON specs, e seção de "Deltas vs. Entrevista".

## Perguntas

### O EDD está fiel ao que você quer configurar?
Revise especialmente a seção "Deltas vs. Entrevista" — qualquer item flagged
ali é uma proposta fora do que você disse originalmente, e exige aprovação explícita.

1. Aprovado — design fiel, pode configurar
2. Aprovado com deltas aceitos — os itens flagged em "Deltas" estão OK
3. Ajustes menores — corrigir campos/layers específicos
4. Reprovado — abordagem incorreta, refazer design

### A estimativa de operações POST e volume estão aceitáveis?
Dev local suporta carga moderada. Cuidado com cargas iniciais muito grandes.

1. Dentro do razoável — prosseguir
2. Muito pesado — simplificar (reduzir Items/Customers na layer 4)
3. Vou rodar apenas layers específicas nesta execução — informar quais
