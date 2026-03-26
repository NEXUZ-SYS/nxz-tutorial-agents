# Analise de Padroes — 2026-03-26

## Resumo

- **Periodo:** 2026-03-11 a 2026-03-26 (15 dias)
- **Conversas extraidas:** 172
- **Conversas com problema real:** 102 (59%)
- **Conversas de teste/automacao:** 17 (10%)
- **Conversas sem problema descrito:** 53 (31%)
- **Temas identificados com >= 3 ocorrencias:** 6
- **Temas para gerar FAQ:** 4 (Criar)
- **Temas ja cobertos:** 1 (Adequada)
- **Temas para atualizar:** 1 (Atualizar)

## Observacoes sobre qualidade dos dados

- 31% das conversas sao contatos sem problema descrito (bot resolveu antes de chegar ao agente humano ou cliente nao descreveu a demanda). Estas foram excluidas da analise.
- 10% sao conversas de teste de automacao. Excluidas.
- Muitas conversas classificadas como "indefinido" (53 de 172) possuem contexto insuficiente para identificar o produto. 5 delas sao claramente sobre Notas Fiscais e foram reclassificadas.
- Nao houve conversas sobre NXZ KDS no periodo analisado.

## Temas Priorizados por Produto

### NXZ ERP (5 temas, 28 conversas)

| # | Tema | Frequencia | Status Help Center | Acao |
|---|------|-----------|-------------------|------|
| 1 | Exportacao e envio de Notas Fiscais (XML) para contabilidade | 14 conversas | Draft existente: "Como exportar o relatorio mensal de notas" | **Criar** (draft nao publicado, reformular) |
| 2 | Atualizacao de Certificado Digital A1 | 4 conversas | Publicado: "Como Atualizar ou Renovar seu Certificado Digital A1" | Adequada |
| 3 | Criacao e gestao de Cupons de Desconto | 4 conversas | Sem FAQ | **Criar** |
| 4 | Cancelamento e correcao de vendas no PDV | 3 conversas | Sem FAQ | **Criar** |
| 5 | Cancelamento e inutilizacao de Notas Fiscais | 3 conversas | Sem FAQ | **Criar** |

### NXZ Pay Go (1 tema, 4 conversas)

| # | Tema | Frequencia | Status Help Center | Acao |
|---|------|-----------|-------------------|------|
| 1 | Configuracao e integracao da maquininha NXZ Pay Go | 4 conversas | Draft existente: "Como Integrar o NXZ PAY GO (Smart POS) com o NXZ GO" | **Atualizar** |

### NXZ Go — Sem temas com >= 3 ocorrencias

### NXZ KDS — Sem conversas no periodo

### NXZ Delivery — 1 conversa apenas (abaixo do threshold)

## Distribuicao por produto (conversas reais)

| Produto | Conversas | % do total real |
|---------|-----------|----------------|
| NXZ ERP | 78 | 76% |
| indefinido | 16 | 16% |
| NXZ Pay Go | 4 | 4% |
| NXZ Go | 3 | 3% |
| NXZ Delivery | 1 | 1% |

## Artigos existentes no Help Center (portal: ajuda)

| Artigo | Status | Tema coberto? |
|--------|--------|--------------|
| Como Atualizar ou Renovar seu Certificado Digital A1 | published | Sim (4 conversas) |
| Como exportar o relatorio mensal de notas (NFe e NFCe) | draft | Parcial (reformular, 14 conversas) |
| Como importar notas fiscais (XML) emitidas fora do sistema | draft | Relacionado |
| Como Integrar o NXZ PAY GO com o NXZ GO | draft | Sim (4 conversas) |
| Demais artigos (Sangria, Reforco Caixa, Variacoes, etc.) | draft | Sem demanda no periodo |

## Recomendacoes

1. **Prioridade maxima:** Notas Fiscais — 14 conversas sobre exportar/enviar XML para contabilidade. O draft existente deve ser reformulado e publicado.
2. **Criar FAQ sobre Cupons de Desconto** — 4 conversas, tema nao coberto.
3. **Criar FAQ sobre Cancelamento de Vendas** — 3 conversas, operacao comum no PDV.
4. **Criar FAQ sobre Cancelamento/Inutilizacao de NF** — 3 conversas, tema recorrente.
5. **Atualizar FAQ do Pay Go** — 4 conversas, draft existente pode ser melhorado.
6. **Certificado Digital ja esta coberto** — artigo publicado, nao precisa de acao.
7. **Investigar conversas "indefinido"** — 31% sem produto identificado. Melhorar labels no Chatwoot reduziria essa taxa.
