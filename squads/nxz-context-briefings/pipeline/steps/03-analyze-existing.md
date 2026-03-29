---
id: analyze-existing
agent: analyst
execution: subagent
model_tier: powerful
inputFile: squads/nxz-context-briefings/output/briefing-config.md
outputFile: squads/nxz-context-briefings/output/context-analysis.yaml
---

# Analise de Contextos Existentes + Fontes Adicionais

## Objetivo

Analisar todos os arquivos de contexto existentes na pasta `context/`, processar fontes
adicionais fornecidas pelo usuario, identificar lacunas e recomendar o que deve ser
coberto no novo briefing.

## Instrucoes

### Fase 1: Contextos existentes

1. Leia o arquivo de configuracao do briefing para entender produto, publico, nivel e objetivo
2. Leia TODOS os arquivos na pasta `context/` do projeto:
   - `(V_0.1) NXZ GO.md`
   - `(V_0.1) NXZ Go - Arquitetura.md`
   - `(V_0.1) NXZ KDS funcionalidades.md`
   - `(V_0.1) NXZ KDS.md`
   - `(V_0.1) NXZ SMART_POS.md`
   - `(V_0.1) NXZ TOTEM.md`
   - `(v_ 0.2) Briefing de Contexto de Persona da Nexuz.md`
   - `(v_ 0.2) Briefing de Contexto de Produtos Nexuz.md`
   - `(v_ 0.4) Briefing de Contexto de Negócios da Nexuz.md`
   - `NXZ Go - Funcionalidades.md`
   - `comparativo.md`
   - `fluxos.md`
3. Para cada arquivo, catalogue:
   - Versao e data (se disponivel)
   - Produtos cobertos
   - Tipo de informacao (tecnico, negocio, persona, funcionalidades)
   - Publico-alvo implicito
   - Nivel organizacional implicito
   - Presenca de exemplos praticos
   - Cross-references com outros produtos

### Fase 2: Fontes adicionais do usuario

4. Leia o arquivo `additional-sources.md` (output do checkpoint-sources)
5. Para cada fonte adicional fornecida, processe conforme o tipo:

   **Arquivo local:**
   - Leia o arquivo usando o caminho fornecido (Read tool)
   - Extraia informacoes relevantes ao produto/publico/nivel selecionado

   **Website/URL:**
   - Faca fetch do conteudo usando WebFetch
   - Extraia informacoes relevantes, descartando navegacao/footer/ads

   **Pagina do Notion:**
   - Use a ferramenta `mcp__claude_ai_Notion__notion-fetch` com a URL fornecida
   - Extraia o conteudo estruturado da pagina

   **Texto livre:**
   - O texto ja esta no arquivo additional-sources.md
   - Parse e catalogue a informacao fornecida

6. Para cada fonte adicional processada, catalogue:
   - Tipo da fonte
   - Informacao extraida (resumo)
   - Relevancia para o briefing (alta/media/baixa)
   - Gaps que esta fonte preenche
   - Se ha conflito com informacoes existentes

### Fase 3: Analise consolidada

7. Identifique lacunas especificas para o produto/publico/nivel selecionado
   (considerando TODOS os contextos: existentes + fontes adicionais)
8. Pesquise na web melhores praticas de context engineering para briefings de produto
9. Produza o relatorio de analise no formato YAML estruturado

## Contexto

- **Pasta de contextos:** `context/` (raiz do projeto)
- **Fontes adicionais:** `additional-sources.md` (output do checkpoint anterior)
- **Produto alvo:** Definido no arquivo de configuracao
- **Publico/nivel:** Definido no arquivo de configuracao

## Veto Conditions

- Analise nao leu todos os arquivos de contexto existentes
- Analise nao processou as fontes adicionais fornecidas pelo usuario (se houver)
- Analise nao identifica lacunas especificas para o produto selecionado
- Analise nao inclui recomendacoes de estrutura para o briefing
