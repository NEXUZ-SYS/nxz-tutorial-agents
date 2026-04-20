---
task: "Identificar lacunas do briefing e montar o briefing-analysis.md consolidado"
order: 3
input: |
  - problem-statement output da task 1 (problem statement, 5 Whys, solutions disguised)
  - stakeholders-sipoc output da task 2 (stakeholder map, SIPOC, AS-IS narrative)
output: |
  - gap-list: perguntas agrupadas por tema (Contexto, Pessoas, AS-IS, TO-BE, Constraints, Success Criteria, LGPD), cada uma com prioridade (Critical/High/Medium) e rationale
  - quantified-pain-summary: volume, cycle time, error rate, financial impact — ou "NÃO INFORMADO"
  - briefing-analysis-assembly: instrução de montagem do arquivo final briefing-analysis.md referenciando os 3 outputs
---

# Identify Briefing Gaps and Assemble Analysis

Consolida o diagnóstico gerado pelas tasks 1 e 2 e produz a lista estruturada de lacunas que ainda impedem o desenho seguro de TO-BE. Cada lacuna é uma pergunta priorizada com rationale de por que ela importa. Ao final, monta o arquivo `briefing-analysis.md` costurando os três outputs em ordem lógica.

## Process

1. **Varrer o problem statement e o SIPOC** identificando campos marcados HIPÓTESE, NÃO INFORMADO ou responsáveis não nomeados. Cada item vira candidato a lacuna.
2. **Classificar cada lacuna em um dos 7 temas:** Contexto (histórico, escopo, prazos), Pessoas (papéis ausentes, conflitos), AS-IS (passos não mapeados, handoffs escuros), TO-BE (expectativa de estado futuro), Constraints (legal, orçamentário, cultural, temporal), Success Criteria (como mediremos sucesso), LGPD (dados pessoais tratados, base legal, acesso).
3. **Atribuir prioridade** a cada pergunta: **Critical** (sem resposta, não é possível desenhar TO-BE sem risco alto), **High** (resposta necessária antes do desenho, mas há workaround temporário), **Medium** (refinamento; pode ser respondida durante o desenho).
4. **Montar quantified-pain-summary** extraindo do briefing todo número disponível (volume mensal, tempo de ciclo, taxa de erro, custo/juros, SLA atual). Para cada métrica ausente, registrar "NÃO INFORMADO" e incluir pergunta correspondente na gap list com prioridade Critical.
5. **Escrever rationale de uma linha** para cada pergunta explicando qual decisão futura depende dessa resposta.
6. **Produzir instrução de assembly** do `briefing-analysis.md` final, especificando ordem de seções, âncoras de referência aos três outputs e checkpoint sugerido.

## Output Format

```yaml
gap_list:
  Contexto:
    - pergunta: "<pergunta aberta>"
      prioridade: "Critical | High | Medium"
      rationale: "<uma linha: que decisão depende disso>"
  Pessoas:
    - pergunta: "..."
      ...
  AS_IS: [...]
  TO_BE: [...]
  Constraints: [...]
  Success_Criteria: [...]
  LGPD: [...]

quantified_pain_summary:
  volume_mensal: "<número + unidade | NÃO INFORMADO>"
  cycle_time_atual: "<número + unidade | NÃO INFORMADO>"
  error_rate: "<% | NÃO INFORMADO>"
  financial_impact: "<R$ + período | NÃO INFORMADO>"
  sla_atual: "<prazo | NÃO INFORMADO | INEXISTENTE>"

briefing_analysis_assembly: |
  <instrução de montagem do arquivo final>
```

## Output Example

```yaml
gap_list:
  Contexto:
    - pergunta: "Qual a janela de tempo que o sponsor considera aceitável para pagamento após recebimento da nota?"
      prioridade: "Critical"
      rationale: "Define o SLA alvo do TO-BE; sem isso não há critério de sucesso quantificado."
    - pergunta: "Existe restrição orçamentária ou de prazo que limita o escopo desta iniciativa?"
      prioridade: "High"
      rationale: "Define o espaço de solução viável antes do desenho."
  Pessoas:
    - pergunta: "Quem é o Coordenador Financeiro responsável por responder pelo processo ponta a ponta?"
      prioridade: "Critical"
      rationale: "Sem process owner nomeado não há accountable do processo no TO-BE."
    - pergunta: "A área solicitante de compra tem um ponto focal único para resolução de pendências de nota?"
      prioridade: "High"
      rationale: "Define quem é o parceiro do analista no handoff upstream."
  AS_IS:
    - pergunta: "Qual o percentual real de notas que chegam sem dados mínimos preenchidos?"
      prioridade: "Critical"
      rationale: "É a principal hipótese do 5 Whys; sem número não há baseline."
    - pergunta: "Existe fila ou prioridade definida quando o caixa não comporta todos os vencimentos do dia?"
      prioridade: "High"
      rationale: "Impacta regra de priorização no TO-BE."
    - pergunta: "O pagamento é executado manualmente ou via agendamento em sistema bancário?"
      prioridade: "Medium"
      rationale: "Contextualiza esforço operacional no passo 6 do SIPOC."
  TO_BE:
    - pergunta: "O sponsor quer eliminar atrasos (zero tolerância) ou reduzir o volume de atrasos (meta percentual)?"
      prioridade: "Critical"
      rationale: "Define a ambição do TO-BE e o custo aceitável para atingir."
    - pergunta: "Em que momento o analista deveria ser notificado de vencimentos próximos (D-7, D-3, D-1)?"
      prioridade: "High"
      rationale: "Alimenta a regra de antecipação no desenho futuro."
  Constraints:
    - pergunta: "Há política interna que impede envolver o solicitante na cobrança de dados?"
      prioridade: "High"
      rationale: "Pode vetar a solução mais direta ao problema upstream."
    - pergunta: "Existe prazo regulatório para retenção de comprovantes de pagamento?"
      prioridade: "Medium"
      rationale: "Define requisitos de arquivamento."
  Success_Criteria:
    - pergunta: "Qual o valor de juros de mora pago nos últimos 6 meses que justifica a iniciativa?"
      prioridade: "Critical"
      rationale: "Baseline financeiro; sem isso não há ROI verificável."
    - pergunta: "Qual métrica o CFO quer ver em dashboard mensal após a melhoria?"
      prioridade: "High"
      rationale: "Define o indicador de acompanhamento."
  LGPD:
    - pergunta: "O processo trata dados pessoais de contatos de fornecedor (nome, e-mail, telefone)? Qual a base legal?"
      prioridade: "High"
      rationale: "LGPD by design exige mapeamento antes do desenho."
    - pergunta: "Quem tem acesso aos dados de fatura hoje e esse acesso está justificado pela função?"
      prioridade: "Medium"
      rationale: "Princípio de necessidade; pode exigir revisão de perfis no TO-BE."

quantified_pain_summary:
  volume_mensal: "NÃO INFORMADO (estimativa do briefing: 'muitas notas por dia')"
  cycle_time_atual: "NÃO INFORMADO"
  error_rate: "NÃO INFORMADO (percepção: 'a maioria chega sem centro de custo')"
  financial_impact: "NÃO INFORMADO (CFO mencionou 'juros altos' sem número)"
  sla_atual: "INEXISTENTE (nenhum SLA formal mencionado no briefing)"

briefing_analysis_assembly: |
  Montar squads/nxz-backoffice-processes/output/briefing-analysis.md com a seguinte estrutura:

  1. Cabeçalho: título "Briefing Analysis — <tema do processo>", data, versão v1.
  2. Seção "1. Problem Statement": copiar problem_statement + restatement_rationale da task 1.
  3. Seção "2. Cadeia de Causa Raiz (5 Whys)": tabela com os níveis da task 1, coluna FATO/HIPÓTESE visível.
  4. Seção "3. Soluções Disfarçadas Detectadas": lista da task 1 com a pergunta real por trás.
  5. Seção "4. Stakeholder Map": tabela da task 2.
  6. Seção "5. SIPOC Macro": tabela da task 2.
  7. Seção "6. AS-IS Narrative": prosa da task 2.
  8. Seção "7. Lacunas do Briefing": gap_list desta task, agrupada por tema, ordenada por prioridade (Critical > High > Medium).
  9. Seção "8. Dor Quantificada": quantified_pain_summary desta task.
  10. Rodapé "Checkpoint": listar todas as lacunas Critical como bloqueio ao avanço do pipeline; exigir sign-off explícito do usuário sobre como tratar cada uma (responder agora, assumir hipótese com risco declarado, ou postergar para fase de validação).

  Ao final, o pipeline pausa em checkpoint até o usuário responder as lacunas Critical ou aprovar o risco de seguir com hipóteses declaradas.
```

## Quality Criteria

1. Gap list contém ao menos uma pergunta em cada um dos 7 temas (Contexto, Pessoas, AS-IS, TO-BE, Constraints, Success Criteria, LGPD) — ou justificativa explícita de por que um tema está vazio.
2. Toda pergunta tem prioridade atribuída (Critical/High/Medium) e rationale de uma linha.
3. Quantified-pain-summary cobre as 5 métricas base; métricas ausentes estão explicitamente marcadas NÃO INFORMADO ou INEXISTENTE e geram pergunta correspondente na gap list.
4. Instrução de assembly lista todas as 10 seções do arquivo final em ordem, com referência clara a qual task produziu cada parte.
5. Nenhuma pergunta da gap list assume solução ou menciona ferramenta/marca.

## Veto Conditions

- **Zero lacunas Critical identificadas em briefing com NÃO INFORMADO.** Se o quantified-pain-summary tem métricas não informadas e nenhuma pergunta Critical foi gerada, revisar: provavelmente a priorização está subestimando o risco de seguir sem baseline.
- **Gap list sem tema LGPD quando o processo toca dado pessoal.** Se o SIPOC ou a narrativa AS-IS mencionam contato com pessoa física (cliente, fornecedor PF, colaborador) e o tema LGPD está vazio, bloquear e preencher antes do briefing-analysis.md ser montado.
