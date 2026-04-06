---
id: cash-flow-weekly
name: "Fluxo de Caixa Semanal (30 dias)"
agent: flavia-fluxo
order: 1
---

# Fluxo de Caixa Semanal — Proximo 30 Dias

## Processo

1. **Extrair saldo atual** — Obter saldo do Banco Inter (Google Sheets) na data de referencia
2. **Mapear recebiveis Asaas** — Listar todas as cobrancas com vencimento nos proximos 30 dias, agrupadas por dia
3. **Aplicar taxa de inadimplencia** — Descontar percentual historico de inadimplencia sobre recebiveis (usar media dos ultimos 3 meses)
4. **Levantar saidas programadas** — Contas a pagar confirmadas: fornecedores, folha, impostos, assinaturas de servicos
5. **Calcular saldo projetado diario** — Saldo inicial + entradas esperadas - saidas programadas = saldo final do dia
6. **Classificar status de liquidez** — OK (saldo > 30 dias opex), ALERTA (< 30 dias), CRITICO (< 15 dias)
7. **Conciliar** — Cruzar recebiveis Asaas com entradas reais no Inter para dias ja realizados
8. **Sinalizar divergencias** — Qualquer diferenca > 5% entre projetado e realizado deve ser destacada com motivo

## Formato de Output

Tabela markdown com colunas:

| Data | Saldo Inicial | Entradas (Asaas) | Entradas (Outras) | Saidas | Saldo Final | Status |

Seguida de:
- **Resumo de premissas**: taxa de inadimplencia aplicada, fonte dos dados
- **Alertas**: dias com saldo critico ou pagamentos concentrados
- **Conciliacao**: resumo de divergencias projetado vs realizado (para dias passados)

## Exemplo de Output

```
Fluxo de Caixa Semanal — 01/04/2026 a 30/04/2026
Saldo inicial: R$ 45.000,00 (Banco Inter, ref. 01/04/2026)
Taxa de inadimplencia aplicada: 8,3% (media jan-mar/2026)

| Data       | Saldo Inicial | Entradas Asaas | Outras Entradas | Saidas       | Saldo Final  | Status  |
|------------|---------------|----------------|-----------------|--------------|--------------|---------|
| 01/04/2026 | R$ 45.000,00  | R$ 6.800,00    | R$ 0,00         | R$ 2.300,00  | R$ 49.500,00 | OK      |
| 02/04/2026 | R$ 49.500,00  | R$ 3.200,00    | R$ 0,00         | R$ 18.000,00 | R$ 34.700,00 | ALERTA  |
| ...        | ...           | ...            | ...             | ...          | ...          | ...     |

Alertas:
- 02/04: Pagamento de folha concentrado (R$ 18.000,00). Saldo cai para nivel ALERTA.
- 10/04: Vencimento de impostos (ISS + DAS). Prever R$ 4.200,00.

Conciliacao (dias realizados):
- 01/04: Projetado R$ 49.500,00 | Realizado R$ 48.900,00 | Divergencia: -1,2% (OK)
```

## Criterios de Qualidade

1. Todos os 30 dias preenchidos sem lacunas
2. Recebiveis Asaas separados de outras entradas
3. Taxa de inadimplencia declarada e justificada
4. Status de liquidez calculado para cada dia
5. Dias ja realizados com coluna de conciliacao
6. Divergencia projetado vs realizado < 5% para ser considerado aceitavel

## Condicoes de Veto

- Saldo inicial nao confirmado com extrato real do Inter
- Recebiveis Asaas com mais de 24h de defasagem
- Ausencia de contas a pagar para os proximos 30 dias
- Taxa de inadimplencia nao declarada ou sem base historica
