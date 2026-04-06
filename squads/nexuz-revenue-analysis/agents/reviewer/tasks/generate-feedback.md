---
task: generate-feedback
order: 2
input:
  - squads/nexuz-revenue-analysis/output/review-score.md
  - squads/nexuz-revenue-analysis/output/analise-cruzamento.md
  - squads/nexuz-revenue-analysis/output/relatorio-receita.md
output: squads/nexuz-revenue-analysis/output/review-feedback.md
---

# Generate Feedback — Emitir Feedback da Revisão

Com base no score calculado na task anterior, emitir o veredicto final e o feedback detalhado. Score >= 7.0 resulta em APROVADO. Score < 7.0 resulta em REPROVADO, com lista de correções obrigatórias que dispara o loop `on_reject` de volta ao analista.

---

## Process

1. **Ler o review-score.md** — Carregar score geral, veredicto preliminar, issues por dimensão e anti-patterns violados.

2. **Determinar veredicto final** — Se `score_geral >= 7.0`: emitir APROVADO com sugestões de melhoria opcionais. Se `score_geral < 7.0`: emitir REPROVADO com lista de correções obrigatórias numeradas, cada uma com: (a) o problema específico, (b) onde está no arquivo, (c) como corrigir.

3. **Redigir o feedback** — Para APROVADO: destacar pontos fortes, listar sugestões não bloqueantes, confirmar que a análise está pronta para aprovação humana. Para REPROVADO: listar todas as correções obrigatórias de forma clara e sequencial, indicar que o pipeline retornará ao analista via `on_reject` até que os issues sejam resolvidos.

---

## Output Format

```yaml
# review-feedback.md
veredicto: <APROVADO | REPROVADO>
score_geral: <float>
data_revisao: <ISO 8601>
pontos_fortes: <list of strings>
correcoes_obrigatorias: <list — presente apenas em REPROVADO>
  - id: <int>
    dimensao: <string>
    problema: <string>
    localizacao: <string>
    correcao: <string>
sugestoes_opcionais: <list of strings>
proximo_passo: <string>
```

---

## Output Example

```markdown
# Review Feedback — Análise de Receita Nexuz

**Veredicto: APROVADO**
**Score: 8.0 / 10**
**Data da Revisão: 2026-04-06**

---

## Pontos Fortes

- Contagem de clientes fechada e consistente (159 total, soma das categorias bate)
- Classificação baseada diretamente em `subscription_status`, sem inferência indevida por pagamento
- Resumo executivo presente com exatamente 3 bullet points
- Metodologia declara data de extração e volume de registros analisados

---

## Sugestões Opcionais (não bloqueantes)

1. **Completar CPF/CNPJ na lista de inadimplentes** — A lista de clientes OVERDUE inclui nome e ID, mas não CPF/CNPJ. Adicionar este campo facilitaria identificação manual.
2. **Estimar impacto financeiro das recomendações** — A recomendação 3 ("revisar clientes INACTIVE") ficaria mais acionável com estimativa de receita recuperável em BRL.

---

## Próximo Passo

Análise aprovada. Pipeline avança para checkpoint de aprovação humana (step-07-approve-report).

---

# Exemplo de REPROVADO

**Veredicto: REPROVADO**
**Score: 5.5 / 10**
**Data da Revisão: 2026-04-06**

---

## Correções Obrigatórias

1. **[Integridade dos Dados]** Contagem não fecha
   - Problema: Total declarado no relatório é 159 clientes, mas a soma das categorias em `analise-cruzamento.md` é 162.
   - Localização: `relatorio-receita.md` > seção "Resumo Executivo", linha 1. `analise-cruzamento.md` > tabela de categorias.
   - Correção: Identificar e remover os 3 clientes duplicados entre categorias antes de prosseguir.

2. **[Classificação de Clientes]** Inferência indevida por pagamento
   - Problema: 4 clientes com `subscription_status: ACTIVE` foram classificados em "inadimplentes" apenas por ter pagamento OVERDUE.
   - Localização: `analise-cruzamento.md` > seção "Clientes Inadimplentes".
   - Correção: Reclassificar usando `subscription_status` diretamente. ACTIVE com pagamento OVERDUE permanece como ativo.

3. **[Completude do Relatório]** Resumo executivo com 4 bullet points
   - Problema: O resumo executivo contém 4 bullet points ao invés dos 3 exigidos pelos critérios.
   - Localização: `relatorio-receita.md` > seção "Resumo Executivo".
   - Correção: Consolidar os bullet points para exatamente 3, mantendo as informações mais relevantes.

---

## Próximo Passo

Análise reprovada. Pipeline retorna ao analista via `on_reject` para correção dos 3 issues obrigatórios listados acima.
```

---

## Quality Criteria

- [ ] Veredicto final consistente com score (>= 7.0 = APROVADO, < 7.0 = REPROVADO)
- [ ] Em REPROVADO: cada correção obrigatória com problema, localização e correção específica
- [ ] Em APROVADO: pontos fortes listados e sugestões claramente marcadas como não bloqueantes
- [ ] Próximo passo declarado explicitamente (avançar no pipeline ou retornar ao analista)
- [ ] Data da revisão registrada em formato ISO 8601

---

## Veto Conditions

- Veredicto APROVADO emitido com correções obrigatórias listadas — contradição lógica que invalida o feedback
- Veredicto REPROVADO sem nenhuma correção obrigatória listada — rejeição sem justificativa acionável
