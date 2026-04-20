---
task: "Extrair enunciado de problema a partir da demanda bruta do briefing"
order: 1
input: |
  - briefing-context.md: texto cru da demanda relatada pelo solicitante, área impactada, contexto adicional (prazos, sponsor, reclamações recorrentes) capturado no step-01
output: |
  - problem-statement: 1 frase em termos de sintoma (quem sente, o que acontece, frequência, impacto)
  - restatement-rationale: 2-4 linhas explicando por que o enunciado foi reformulado a partir da demanda original
  - five-whys-chain: cadeia de 4-5 níveis de causa raiz, cada nível marcado como FATO ou HIPÓTESE
  - solutions-disguised: lista de "soluções disfarçadas de demanda" detectadas no briefing original
---

# Extract Problem Statement

Transforma a demanda bruta do briefing em um enunciado de problema em linguagem de sintoma, aplica cadeia mínima de 5 Whys para rastrear causa raiz e sinaliza explicitamente todas as soluções que o solicitante trouxe disfarçadas de requisito. É o primeiro passo do diagnóstico: sem enunciado de sintoma e cadeia de causa, o desenho de TO-BE vira adivinhação.

## Process

1. **Ler o briefing cru** e isolar frases que descrevem dor (o que não funciona, o que atrasa, o que gera retrabalho) de frases que descrevem solução pretendida ("quero um relatório", "precisamos de um aprovador", "tem que ter um campo de").
2. **Reformular em linguagem de sintoma.** Escrever uma frase única no formato: "[Papel/área] não consegue [ação/decisão] quando [gatilho], gerando [impacto quantificado ou qualitativo]." Sem mencionar solução, sem adjetivo vago, sem nome de ferramenta.
3. **Aplicar 5 Whys** partindo do sintoma. Cada "porque" desce um nível. Mínimo 4 níveis, máximo 6. Cada nível é marcado como FATO (há evidência no briefing) ou HIPÓTESE (precisa ser validado com stakeholder).
4. **Detectar soluções disfarçadas.** Varrer o briefing original e listar toda frase que propõe solução antes do problema estar claro. Cada item vira hipótese de solução a ser retomada após o desenho — não requisito.
5. **Escrever restatement-rationale** de 2-4 linhas explicando por que o enunciado novo difere do pedido original e que perda/ganho isso traz para o escopo.

## Output Format

```yaml
problem_statement: "<uma frase, sintoma, sem solução>"
restatement_rationale: |
  <2-4 linhas explicando a reformulação>
five_whys_chain:
  - level: 1
    why: "<por que isso acontece?>"
    answer: "<resposta>"
    evidence: "FATO | HIPÓTESE"
    source: "<trecho do briefing ou NÃO INFORMADO>"
  - level: 2
    ...
solutions_disguised_as_demand:
  - original_quote: "<frase literal do briefing>"
    implied_solution: "<qual solução está sendo proposta>"
    real_question_behind: "<que decisão ou dor está por trás>"
```

## Output Example

```yaml
problem_statement: "O time de contas a pagar não consegue identificar com antecedência faturas próximas do vencimento, gerando pagamentos em atraso recorrentes, juros e desgaste com fornecedores."

restatement_rationale: |
  A demanda original era "preciso de um dashboard de pagamentos atrasados". Reformulei para sintoma
  porque dashboard é uma hipótese de solução; o problema real é a incapacidade de ANTECIPAR, não de
  visualizar o que já atrasou. Um dashboard retroativo não resolveria a causa.

five_whys_chain:
  - level: 1
    why: "Por que o time não consegue identificar faturas próximas do vencimento?"
    answer: "Porque a lista de faturas em aberto só é consultada quando o fornecedor liga cobrando."
    evidence: "FATO"
    source: "Briefing: 'a gente só descobre quando o fornecedor liga'."
  - level: 2
    why: "Por que a lista só é consultada sob provocação externa?"
    answer: "Porque não existe rotina estabelecida de revisão diária/semanal de vencimentos."
    evidence: "HIPÓTESE"
    source: "NÃO INFORMADO — validar com executor."
  - level: 3
    why: "Por que não existe rotina de revisão?"
    answer: "Porque a fila de entrada de notas é vista como prioridade maior que a fila de saída."
    evidence: "HIPÓTESE"
    source: "Inferido a partir de comentário sobre 'volume de notas entrando'."
  - level: 4
    why: "Por que a fila de entrada consome todo o tempo do time?"
    answer: "Porque notas chegam sem dados mínimos (centro de custo, aprovador) e exigem retrabalho manual antes de entrar no fluxo."
    evidence: "FATO"
    source: "Briefing: 'a maioria chega sem centro de custo preenchido'."
  - level: 5
    why: "Por que as notas chegam sem dados mínimos?"
    answer: "Porque quem solicita a compra não preenche os campos obrigatórios no pedido upstream."
    evidence: "HIPÓTESE"
    source: "Inferido — precisa ser validado com área solicitante."

solutions_disguised_as_demand:
  - original_quote: "preciso de um dashboard de pagamentos atrasados"
    implied_solution: "Painel visual de atrasos"
    real_question_behind: "Como antecipar vencimentos antes do atraso acontecer?"
  - original_quote: "tinha que ter um alerta por e-mail"
    implied_solution: "Notificação automática"
    real_question_behind: "Qual gatilho e qual papel deve agir ao receber o alerta?"
  - original_quote: "se tivesse um campo de prioridade já resolvia"
    implied_solution: "Campo customizado no registro da fatura"
    real_question_behind: "Como o time decide hoje o que pagar primeiro quando o caixa é limitado?"
```

## Quality Criteria

1. Problem statement tem exatamente uma frase, começa com papel/área e descreve sintoma — não solução.
2. Cadeia de 5 Whys tem no mínimo 4 níveis; cada nível é marcado FATO ou HIPÓTESE com fonte.
3. Lista de soluções disfarçadas contém todas as propostas de solução presentes no briefing original, com a pergunta real por trás de cada uma.
4. Nenhum item do output menciona nome de ferramenta, software, sistema ou marca.

## Veto Conditions

- **Briefing ambíguo sem dor concreta.** Se o briefing só contém pedido de solução sem descrição de dor (ex: "quero automatizar X"), pausar e exigir entrevista adicional antes de prosseguir.
- **Cadeia de 5 Whys quebra em "falta de ferramenta".** Se todos os porquês terminam em "porque não temos sistema que faça", voltar um nível e investigar processo/pessoa/dado antes de aceitar.
- **Demanda contém exigência de ferramenta específica.** Se o briefing exige uso/não-uso de marca específica, registrar como constraint mas não incorporar ao problem statement.
