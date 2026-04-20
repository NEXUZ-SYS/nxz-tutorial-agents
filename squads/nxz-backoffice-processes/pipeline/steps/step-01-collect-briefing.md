---
type: checkpoint
outputFile: squads/nxz-backoffice-processes/pipeline/data/briefing-context.md
---

# Step 01: Coleta do Briefing Inicial

## Context

Este é o ponto de partida do pipeline de desenho de processos de backoffice. Ainda não sabemos nada sobre a demanda — o usuário (sponsor do processo, BPO ou líder interno) precisa descrever o problema em linguagem natural, apontar áreas envolvidas e anexar contextos relevantes. O squad é deliberadamente **tool-agnostic**: qualquer menção a ferramentas serve apenas para contextualizar a realidade operacional atual, não para guiar o desenho.

O registro gerado aqui (`briefing-context.md`) alimenta a Ana Análise no Step 02.

## Perguntas ao Usuário

Apresente as perguntas abaixo de forma numerada, aguardando a resposta completa antes de prosseguir. Para campos com opções, use AskUserQuestion.

1. **Demanda (texto livre)**
   Descreva em linguagem natural o processo / problema / demanda que precisa ser desenhado. Fale do ponto de vista do que dói hoje, não da solução imaginada. Inclua sintomas, gatilhos recentes e, se possível, quantifique o impacto (atrasos, retrabalho, multas, reclamações).

2. **Área impactada (principal)**
   Qual é a área dona/owner do processo? Escolha uma opção:
   - Financeiro
   - Contábil
   - Compras
   - Ops
   - CS
   - Vendas
   - Produto
   - Jurídico
   - RH
   - TI
   - Outra (especificar)

3. **Áreas impactadas adicionais (texto livre, múltiplas)**
   Quais áreas downstream/upstream são afetadas? Liste todas, separadas por vírgula, indicando brevemente como cada uma entra no fluxo (ex.: "Compras — gera o pedido", "Contábil — recebe a NF para lançamento").

4. **Contextos adicionais (texto livre / anexos)**
   Documentos, SLAs vigentes, regras que já existem, histórico de tentativas anteriores, ferramentas de trabalho atuais (apenas para contexto — o desenho será tool-agnostic). Informe caminhos de arquivos, links internos ou cole o conteúdo relevante.

5. **Audiência do PDD**
   Quem vai ler e aprovar o entregável final? Escolha uma opção:
   - Lideranças internas Nexuz
   - Time BPO
   - Consultoria para cliente externo
   - Misto

## Formato de Registro

O checkpoint grava em `squads/nxz-backoffice-processes/pipeline/data/briefing-context.md` o template abaixo, com as respostas do usuário preenchidas literalmente.

```markdown
# Briefing Context — {data-ISO-YYYY-MM-DD}

## 1. Demanda
{resposta livre — preservar parágrafos originais}

## 2. Área Impactada Principal
{opção selecionada}

## 3. Áreas Impactadas Adicionais
- {área 1} — {papel no fluxo}
- {área 2} — {papel no fluxo}
- ...

## 4. Contextos Adicionais
{links, caminhos de arquivos, trechos colados, SLAs vigentes, histórico de tentativas}

## 5. Audiência do PDD
{opção selecionada}

---
Registrado em: {timestamp-ISO-8601}
Responsável pelo briefing: {nome/ID do usuário se disponível}
```
