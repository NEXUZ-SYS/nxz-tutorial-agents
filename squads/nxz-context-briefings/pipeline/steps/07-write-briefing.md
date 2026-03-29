---
id: write-briefing
agent: writer
execution: inline
inputFile: squads/nxz-context-briefings/output/briefing-config.md
outputFile: squads/nxz-context-briefings/output/briefing-draft.md
---

# Escrita do Briefing de Contexto

## Objetivo

Redigir o briefing de contexto padronizado com base em todos os dados coletados.

## Instrucoes

1. Leia todos os inputs disponiveis:
   - `briefing-config.md` — Produto, publico, nivel, objetivo
   - `context-analysis.yaml` — Analise dos contextos existentes e lacunas
   - `interview-responses.md` — Respostas da entrevista com o usuario
   - `product-exploration.yaml` — Dados da exploracao via Playwright
2. Siga o template padrao definido no agent.md do writer
3. Adapte secoes conforme publico e nivel:
   - **Tech**: inclua secoes 4 (Arquitetura) com detalhes de stack e integracao
   - **Business/Sales**: inclua secao 5 (Modelo de Negocio) com proposta comercial
   - **Estrategico**: inclua secoes 7 (Metricas), 9 (Mercado), 10 (Roadmap)
   - **Operacional**: foque nas secoes 1, 2, 3, 8 com exemplos passo a passo
4. Inclua exemplos praticos em pelo menos 70% das secoes
5. Adicione cross-references explicitas com produtos relacionados usando formato:
   `[Ver: NXZ {Produto} > {Secao}]`
6. Adicione metadata completa no cabecalho:
   - Versao (iniciar em v1.0)
   - Data de geracao
   - Publico-alvo
   - Nivel organizacional
   - Objetivo do briefing
   - Produtos relacionados com tipo de relacao
7. Inclua glossario com termos especificos do produto e do setor Food Service

## Veto Conditions

- Briefing nao segue o template padrao
- Briefing nao inclui exemplos praticos
- Briefing nao inclui cross-references com produtos relacionados
- Briefing nao tem metadata completa
- Briefing usa linguagem inadequada para o publico-alvo definido
- Briefing omite secoes obrigatorias para o nivel organizacional
