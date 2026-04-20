---
task: "Mapear stakeholders e desenhar SIPOC macro do processo AS-IS"
order: 2
input: |
  - problem-statement output da task 1 (problem statement + 5 Whys + solutions disguised)
  - briefing-context.md: briefing original com papéis mencionados, áreas envolvidas, relatos de handoff
output: |
  - stakeholder-map: tabela com papel, nome/função, poder, interesse, tipo (sponsor/owner/executor/beneficiário/adjacente)
  - sipoc-table: Suppliers, Inputs, 5-7 macro Processes, Outputs, Customers
  - as-is-narrative: 1-2 parágrafos descrevendo como o processo acontece hoje, com papéis e handoffs explícitos
---

# Map Stakeholders and SIPOC

Identifica quem está envolvido no processo (em que papel e com que poder/interesse) e desenha o SIPOC macro do fluxo AS-IS. Sem mapa de stakeholders, a elicitação fica enviesada por uma voz só; sem SIPOC, o detalhamento posterior não tem âncora de ponta a ponta. Esta task prepara o terreno para a identificação de lacunas.

## Process

1. **Extrair do briefing todo papel mencionado** (explicitamente ou por implicação: "o pessoal de compras", "quem aprova") e consolidar em tabela de stakeholders. Para cada papel, classificar poder (alto/médio/baixo), interesse (alto/médio/baixo) e tipo (sponsor, process owner, executor, beneficiário, adjacente).
2. **Identificar lacunas óbvias de papel.** Se o processo implica aprovação mas nenhum aprovador foi citado, registrar stakeholder "NÃO IDENTIFICADO — provável aprovador financeiro" como item a validar.
3. **Desenhar SIPOC macro** com 5-7 passos de processo. Cada passo é um verbo no presente + objeto ("Recebe nota fiscal", "Valida dados da nota"). Suppliers e Customers podem ser internos ou externos. Outputs são artefatos verificáveis, não sentimentos.
4. **Escrever narrativa AS-IS** de 1-2 parágrafos costurando o SIPOC em prosa, nomeando papel em cada handoff. Incluir pelo menos dois pontos de handoff e marcar qualquer handoff que apareça como fonte de dor no 5 Whys.
5. **Validar consistência.** Todo papel da tabela de stakeholders aparece em pelo menos um passo do SIPOC ou na narrativa AS-IS; todo passo do SIPOC tem um papel responsável nomeado.

## Output Format

```yaml
stakeholder_map:
  - papel: "<nome do papel>"
    nome_funcao: "<pessoa específica ou NÃO INFORMADO>"
    poder: "alto | médio | baixo"
    interesse: "alto | médio | baixo"
    tipo: "sponsor | process_owner | executor | beneficiário | adjacente"
    observacoes: "<opcional: conflito, dor, expertise>"

sipoc:
  suppliers: ["<fornecedor do input>", ...]
  inputs: ["<input 1>", ...]
  process_steps:
    - step: 1
      acao: "<verbo + objeto>"
      responsavel: "<papel>"
    - step: 2
      ...
  outputs: ["<output verificável>", ...]
  customers: ["<quem recebe o output>", ...]

as_is_narrative: |
  <1-2 parágrafos com papéis nomeados e handoffs explícitos>
```

## Output Example

```yaml
stakeholder_map:
  - papel: "Analista de Contas a Pagar"
    nome_funcao: "Time de 3 analistas, área Financeiro"
    poder: "baixo"
    interesse: "alto"
    tipo: "executor"
    observacoes: "Dono da dor diária; hoje apaga incêndio sob provocação de fornecedor."
  - papel: "Coordenador Financeiro"
    nome_funcao: "NÃO INFORMADO"
    poder: "médio"
    interesse: "alto"
    tipo: "process_owner"
    observacoes: "Responde pelo SLA de pagamento; provável aprovador de exceções."
  - papel: "Diretor Financeiro"
    nome_funcao: "CFO"
    poder: "alto"
    interesse: "médio"
    tipo: "sponsor"
    observacoes: "Demandou a iniciativa; quer reduzir juros de mora."
  - papel: "Solicitante de Compra"
    nome_funcao: "Áreas requisitantes (diversas)"
    poder: "baixo"
    interesse: "baixo"
    tipo: "adjacente"
    observacoes: "Origina o pedido sem dados mínimos; causa raiz de retrabalho upstream."
  - papel: "Fornecedor Externo"
    nome_funcao: "NÃO INFORMADO (múltiplos)"
    poder: "médio"
    interesse: "alto"
    tipo: "beneficiário"
    observacoes: "Hoje atua como 'alarme' informal ligando para cobrar."

sipoc:
  suppliers: ["Fornecedor externo", "Área solicitante de compra"]
  inputs: ["Nota fiscal recebida", "Pedido de compra", "Dados de centro de custo e aprovador"]
  process_steps:
    - step: 1
      acao: "Receber nota fiscal do fornecedor"
      responsavel: "Analista de Contas a Pagar"
    - step: 2
      acao: "Validar dados mínimos da nota (centro de custo, aprovador, pedido vinculado)"
      responsavel: "Analista de Contas a Pagar"
    - step: 3
      acao: "Buscar informações faltantes com área solicitante"
      responsavel: "Analista de Contas a Pagar"
    - step: 4
      acao: "Enviar nota para aprovação do gestor da área"
      responsavel: "Solicitante de Compra"
    - step: 5
      acao: "Registrar vencimento e programar pagamento"
      responsavel: "Analista de Contas a Pagar"
    - step: 6
      acao: "Executar pagamento na data programada"
      responsavel: "Coordenador Financeiro"
  outputs: ["Fatura paga dentro do prazo", "Registro contábil da baixa", "Comprovante ao fornecedor"]
  customers: ["Fornecedor externo", "Contabilidade", "CFO (via relatório de DRE)"]

as_is_narrative: |
  O Analista de Contas a Pagar recebe a nota fiscal do Fornecedor Externo e tenta validar dados mínimos;
  como a maioria das notas chega sem centro de custo ou aprovador vinculado, o analista precisa contatar
  o Solicitante de Compra para completar a informação — este é o primeiro handoff crítico, fonte de
  atraso recorrente segundo o briefing. Após completar os dados, a nota volta ao Solicitante para aprovação
  formal do gestor da área (segundo handoff), e só então retorna ao Analista para programação de pagamento.
  A execução do pagamento é realizada pelo Coordenador Financeiro em data agendada, mas como a fila de
  entrada consome o tempo do analista, a revisão proativa de vencimentos não acontece: o fornecedor cobra
  por telefone antes do time perceber o atraso, o pagamento sai com juros de mora e o CFO recebe o impacto
  no relatório de DRE sem visibilidade prévia.
```

## Quality Criteria

1. Stakeholder map contém no mínimo sponsor, process owner e executor nomeados (ou marcados NÃO INFORMADO).
2. SIPOC tem 5-7 passos de processo; cada passo tem responsável nomeado (um papel, não uma ferramenta).
3. Narrativa AS-IS nomeia pelo menos dois handoffs e usa voz ativa + papel em todas as frases.
4. Nenhum campo do SIPOC está vazio ou preenchido com "diversos" sem detalhamento.
5. Nenhum output menciona ferramenta, sistema ou marca.

## Veto Conditions

- **Nenhum process owner identificável.** Se não há papel claro que responda pelo processo ponta a ponta (nem mesmo hipotético), sinalizar como bloqueio de governança e pausar para checkpoint com usuário antes de seguir.
- **Stakeholder único.** Se o briefing menciona apenas uma voz (só o reclamante), registrar que triangulação é obrigatória e que as próximas entrevistas precisam cobrir no mínimo sponsor e executor antes do desenho prosseguir.
