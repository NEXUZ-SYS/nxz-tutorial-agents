---
task: Exportar Relatório para Google Sheets
order: 4
input:
  - squads/nexuz-revenue-analysis/output/relatorio-receita.md
  - squads/nexuz-revenue-analysis/output/analise-cruzamento.md
output:
  - Confirmação de export com URL da aba criada na planilha
---

# Exportar Relatório para Google Sheets

Exportar os dados do relatório analítico para uma nova aba no Google Sheets. A planilha de destino é identificada pela variável de ambiente `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID`. A aba criada recebe o nome "Análise Receita {YYYY-MM-DD}" com a data de execução.

---

## Processo

### 1. Verificar Planilha de Destino
- Ler a variável de ambiente `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID` para obter o spreadsheet ID
- Chamar `mcp__gsheets__get-spreadsheet-info` com o ID obtido
- Inspecionar as abas existentes para confirmar que a planilha está acessível
- Registrar o nome da planilha e a lista de abas existentes
- Verificar se já existe uma aba com o nome "Análise Receita {data de hoje}" — se sim, usar sufixo `-v2`, `-v3` etc. para evitar sobrescrita

### 2. Preparar os Dados para Escrita
Montar as seguintes seções de dados para export, em ordem:

**Bloco A — Cabeçalho e Métricas (linhas 1–15)**
- Linha 1: `["Nexuz Revenue Analysis — Relatório de Receita"]`
- Linha 2: `["Gerado em:", "{timestamp}"]`
- Linha 3: vazia
- Linha 4: `["Métrica", "Valor"]`
- Linhas 5–11: uma linha por métrica do relatório (MRR, Receita em Risco, Valor Inadimplente, etc.)
- Linha 12: vazia
- Linha 13: `["Distribuição por Categoria", "Clientes", "% do Total"]`
- Linhas 14–18: uma linha por categoria

**Bloco B — Listagem de Inadimplentes (a partir da linha 20)**
- Linha 20: `["Clientes Inadimplentes"]`
- Linha 21: `["customer_id", "Nome", "CPF/CNPJ", "Assinatura", "Valor em Aberto (R$)", "Dias de Atraso"]`
- Linhas seguintes: um cliente por linha

**Bloco C — Listagem de Churn (após inadimplentes)**
- Cabeçalho: `["Clientes em Churn (Assinatura Inativa/Expirada)"]`
- Colunas: `["customer_id", "Nome", "Último Status", "Último Pagamento"]`
- Um cliente por linha

### 3. Escrever na Planilha
- Chamar `mcp__gsheets__write-range` com:
  - `spreadsheetId`: valor lido de `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID`
  - `range`: `"'Análise Receita {data}'!A1"`
  - `values`: array bidimensional com todos os dados preparados no passo anterior
- Confirmar o retorno da ferramenta (número de células atualizadas)
- Registrar a URL de acesso à aba no formato: `https://docs.google.com/spreadsheets/d/{ID}/edit#gid={sheetId}`

---

## Output Format

```yaml
export_sheets:
  status: "sucesso" | "falha"
  spreadsheet_id: "{ID da planilha}"
  aba_criada: "Análise Receita {YYYY-MM-DD}"
  url: "https://docs.google.com/spreadsheets/d/{ID}/edit#gid={sheetId}"
  celulas_escritas: N
  blocos_exportados:
    - bloco: "Cabeçalho e Métricas"
      linhas: N
    - bloco: "Inadimplentes"
      linhas: N
    - bloco: "Churn"
      linhas: N
  exportado_em: "{timestamp ISO 8601}"
  erros: []
```

---

## Output Example

```
Export concluído com sucesso.

Planilha: Nexuz — Contas a Pagar / Receita
ID: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
Aba criada: Análise Receita 2026-04-06
URL: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit#gid=987654321

Dados exportados:
- Bloco A (Cabeçalho e Métricas): 18 linhas
- Bloco B (Inadimplentes): 20 linhas (18 clientes + 2 de cabeçalho)
- Bloco C (Churn): 23 linhas (21 clientes + 2 de cabeçalho)

Total de células escritas: 247
Exportado em: 2026-04-06T15:10:42-03:00

Abas existentes na planilha (antes da criação):
- Resumo Geral
- Pagamentos Março/2026
- Análise Receita 2026-03-05

Nova aba adicionada ao final da planilha.
```

---

## Quality Criteria

- O ID da planilha deve ser lido exclusivamente da variável de ambiente `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID` — nunca hardcoded no código ou na tarefa
- A confirmação de export deve incluir o número de células escritas retornado pela ferramenta `mcp__gsheets__write-range`
- A URL de acesso à aba deve ser construída com o `sheetId` retornado pela ferramenta — não assumir um ID fixo
- Os dados numéricos exportados para o Sheets devem ser valores numéricos (não strings), para que o Sheets possa aplicar formatação e fazer cálculos

---

## Veto Conditions

- **Variável de ambiente ausente:** Se `GOOGLE_SHEETS_CONTAS_A_PAGAR_ID` não estiver definida ou retornar vazio, abortar e solicitar configuração da variável antes de prosseguir
- **Planilha inacessível:** Se `mcp__gsheets__get-spreadsheet-info` retornar erro de permissão ou planilha não encontrada, abortar — não tentar criar uma nova planilha como fallback
- **Relatório de entrada ausente:** Se `relatorio-receita.md` não existir, abortar — o export depende do relatório gerado na tarefa anterior
- **Retorno de escrita com erro:** Se `mcp__gsheets__write-range` retornar erro ou número de células escritas igual a zero, registrar falha e não marcar o export como concluído
