# Referência — Pipes CRM existentes (Pipefy — Nexuz Sistemas Inteligentes)

**Data da leitura:** 2026-04-20  
**Organization ID:** 302461450  
**Origem:** Templates CRM do Pipefy já instalados na org (provavelmente do pacote padrão Pipefy CRM).

## Finalidade deste documento

Este arquivo NÃO altera o plano da squad. A configuração permanece a implementação
do **Pipe Vendas completo** (9 fases) a partir do PDD v1.0 `PDD-NXZ-VENDAS-001`.

Serve como **referência de padrões** de como o Pipefy é utilizado na prática — nomes,
field types, labels, estrutura de start form, pattern de handoff entre pipes via
`create_connected_card`. A Rita Pesquisa pode cruzar estes padrões com a pesquisa
oficial em `research-findings.md`, e o Paulo Pipes pode usá-los como baseline visual
no desenho (Step 04).

## Padrões observados (resumo rápido)

- **Nomenclatura**: prefixo `[CRM]` + nome do processo; `create_card_label` curto e
  orientado à ação ("Novo lead", "Nova oportunidade", "Novo onboarding").
- **Icons**: cada pipe usa um ícone semântico (`bullhorn`, `sales`, `emo`).
- **public: true, anyone_can_create_card: false** — formulário público disponível, mas
  entradas controladas (só membros podem criar cards diretamente).
- **Phases terminais**: sempre 2 (uma positiva e uma negativa), ambas `done: true`.
  Ex.: `Lead qualificado`/`Lead não-qualificado`, `Ganho`/`Perdido`, `Concluído`/`Arquivado`.
- **Labels como temperatura**: `Frio`/`Morno`/`Quente` com cores fixas (#2979FF, #FFAB00,
  #FF3D00). No onboarding, labels representam porte (`Enterprise`, `Empresa Grande`, etc).
- **Statements** (separadores visuais) são usados como divisores de seção dentro de
  phases com muitos campos — geram IDs UUID automáticos.
- **Handoff entre pipes** é feito por 1 automação `card_moved` → `create_connected_card`
  na phase `done: true` do pipe upstream. Exatamente o padrão recomendado pelo PDD para
  `GANHO → Implantação`.
- **Connector fields** usados para relacionamento Lead→Oportunidade→Onboarding e para
  anexar Contato/Empresa (databases).
- **Start Form como porta de entrada**: 6–8 campos, apenas 1–2 obrigatórios (nome do
  contato + empresa). Todo o restante é capturado nas phases subsequentes.
- **Required fields conservadores**: a maioria dos campos de phase é `required: false`.
  Requiredness é usada só nos mínimos absolutos (nome, empresa, connector de handoff).
- **Field types mais comuns**: `short_text`, `long_text`, `select`, `radio_horizontal`,
  `due_date`, `date`, `datetime`, `currency`, `assignee_select`, `label_select`,
  `connector`, `attachment`, `statement`, `id`, `email`, `phone`, `checklist_vertical`.
- **Expiration**: todos os pipes usam `60 minutos` como `expiration_time_by_unit`
  (parece ser o default de template; deve ser revisitado conforme SLAs do PDD).

## Aplicação prática para o Pipe Vendas (PDD)

| Padrão observado | Aplicação no nosso pipe |
|---|---|
| `create_connected_card` em phase done | Handoff `GANHO → Implantação` (PDD §6) |
| 2 phases terminais done=true | `GANHO` + `DESCARTE` (PDD §2) |
| Labels temperatura com cores fixas | Pode ser reaproveitado (`Frio`/`Morno`/`Quente`) |
| Statement como divisor | Organizar phases com muitos campos (ex.: `Fechamento`) |
| Start Form 6–8 campos, 2 required | Aplicar em `Novo Lead — Inbound/Outbound/Indicação` |
| `select` com opções pré-definidas | `Motivo de Descarte` (9 motivos do PDD §11) |
| `connector` para relacionamento | Deal → Conta / Deal → Contato (PDD §5) |
| `expiration` no pipe | Revisitar — PDD tem SLAs por etapa (não pipe-wide) |

---


## Pipe `307117282` — [CRM] Qualificação de Leads

| Atributo | Valor |
|---|---|
| icon | `bullhorn` |
| public | True |
| anyone_can_create_card | False |
| create_card_label | `Novo lead` |
| expiration | 0 60 |

### Start Form Fields (6)

| Label | Type | Required | Options |
|---|---|---|---|
| Nome do contato | `short_text` | True |  |
| Email | `email` | False |  |
| Telefone | `phone` | False |  |
| Empresa | `short_text` | True |  |
| Indústria  | `select` | False | Auditoria, Automotivo, Consultoria, Educação, Energia e Utilitários, S… |
| Observações | `long_text` | False |  |

### Phases (7)


#### `342927252` — **Backlog** 
> Verifique se os leads recebidos são potenciais clientes

| Label | Type | Required | Options |
|---|---|---|---|
| Operador | `assignee_select` | False |  |
| O lead atende ao perfil do nosso cliente? | `radio_horizontal` | False | Sim, Não |
| Informações sobre esse lead | `long_text` | False |  |

#### `342927253` — **Qualificação** 
> Colete as informações iniciais sobre o lead

| Label | Type | Required | Options |
|---|---|---|---|
| Site da empresa | `short_text` | False |  |
| Linkedin do contato | `short_text` | False |  |
| Tamanho da empresa | `select` | False | Micro (1-9 funcionários), Pequena (10-49 funcionários), Média (50-249 … |
| Como essa potencial cliente chegou até nós? | `select` | False | Cold Call, Email marketing, Assinatura no site, Google, Facebook, Inst… |
| Pronto para contato? | `radio_horizontal` | False | Sim, Não |
| Temperatura do lead | `label_select` | False |  |

#### `342927254` — **Ligação de contato** 
> Descubra as necessidades e prazos para compra

| Label | Type | Required | Options |
|---|---|---|---|
| Quais são as necessidades do cliente em potencial? | `long_text` | False |  |
| Prazo para resolução do problema | `select` | False | Necessidade urgente, Procurando solução, Apenas olhando por aí |

#### `342927255` — **Follow up** 
> Acompanhe o status do lead

| Label | Type | Required | Options |
|---|---|---|---|
| Data do próximo follow up | `due_date` | False |  |

#### `342927258` — **Agendar reunião** 
> Agende uma demonstração do produto

| Label | Type | Required | Options |
|---|---|---|---|
| Quem fará a demonstração? | `assignee_select` | False |  |
| Data marcada | `due_date` | False |  |
| Converter lead | `connector` | True |  |
| *(statement/separador)* | `statement` | False |  |

#### `342927256` — **Lead qualificado** (done=True)
> Acesse o processo "Funil de Vendas" para continuar

*(sem campos — phase terminal ou só navegação)*

#### `342927257` — **Lead não-qualificado** (done=True)
> Oportunidades desqualificadas

*(sem campos — phase terminal ou só navegação)*

### Labels (3)

- `Frio` — #2979FF
- `Morno` — #FFAB00
- `Quente` — #FF3D00

### Automations (1)

- **Criar card conectado (Qualificação de Leads -> Funil de Vendas)-  [CRM] Qualificação de Leads** (`306954794`, active=True)
  - Event: `card_moved` → Action: `create_connected_card`


## Pipe `307117283` — [CRM] Funil de Vendas

| Atributo | Valor |
|---|---|
| icon | `sales` |
| public | True |
| anyone_can_create_card | False |
| create_card_label | `Nova oportunidade` |
| expiration | 0 60 |

### Start Form Fields (8)

| Label | Type | Required | Options |
|---|---|---|---|
| Negócio | `short_text` | False |  |
| Contato | `connector` | False |  |
| Empresa | `connector` | True |  |
| Valor do negócio | `currency` | False |  |
| Data de fechamento esperado | `date` | False |  |
| Temperatura do negócio | `label_select` | False |  |
| Notas sobre o negócio | `long_text` | False |  |
| Documentos | `attachment` | False |  |

### Phases (7)


#### `342927244` — **Prospecção** 
> Gerencie seus leads no processo "Qualificação de Leads"

| Label | Type | Required | Options |
|---|---|---|---|
| Número da oportunidade | `id` | False |  |
| Vendedor responsável | `assignee_select` | False |  |
| Tamanho da empresa | `radio_horizontal` | False | Pequena, Média, Grande |
| Canal de aquisição | `select` | False | Google, Facebook, Instagram, Indicação, Busca ativa, Visita ao estabel… |
| *(statement/separador)* | `statement` | None |  |
| Data da próxima atividade | `due_date` | False |  |

#### `342927250` — **Apresentação** 
> Gerencie as necessidades do cliente

| Label | Type | Required | Options |
|---|---|---|---|
| Necessidades do cliente | `long_text` | False |  |

#### `342927246` — **Proposta** 
> Propostas a serem enviadas

| Label | Type | Required | Options |
|---|---|---|---|
| Quais serviços o cliente está adquirindo? | `long_text` | False |  |
| Descontos | `currency` | False |  |
| *(statement/separador)* | `statement` | None |  |
| Descritivo de descontos | `long_text` | False |  |
| Data de validade da proposta | `due_date` | False |  |
| Proposta | `attachment` | False |  |

#### `342927247` — **Negociação** 
> Leads em processo de negociação

| Label | Type | Required | Options |
|---|---|---|---|
| Valor final da oportunidade | `currency` | False |  |
| Informações da negociação | `long_text` | False |  |
| Contrato | `attachment` | False |  |
| Status  | `radio_horizontal` | False | Ganho, Perdido |
| Motivo da perda | `select` | False | Cliente optou por outra ferramenta, Falta de resposta, Preço, Fit com … |
| Data de fechamento | `date` | False |  |

#### `342927245` — **Follow up** 
> Acompanhe seus leads

| Label | Type | Required | Options |
|---|---|---|---|
| Data do próximo follow up | `datetime` | False |  |

#### `342927248` — **Ganho** (done=True)
> Acesse o processo "Onboarding de Clientes" para continuar

*(sem campos — phase terminal ou só navegação)*

#### `342927249` — **Perdido** (done=True)
> Oportunidades perdidas

*(sem campos — phase terminal ou só navegação)*

### Labels (3)

- `Quente` — #FF3D00
- `Morno` — #FFAB00
- `Frio` — #2979FF

### Automations (2)

- **Criar card conectado (Pipeline de Vendas -> Onboarding de Clientes)- [CRM] Funil de Vendas** (`306954793`, active=True)
  - Event: `card_moved` → Action: `create_connected_card`
- **Criar card conectado (Qualificação de Leads -> Funil de Vendas)-  [CRM] Qualificação de Leads** (`306954794`, active=True)
  - Event: `card_moved` → Action: `create_connected_card`


## Pipe `307117284` — [CRM] Onboarding de Clientes

| Atributo | Valor |
|---|---|
| icon | `emo` |
| public | True |
| anyone_can_create_card | False |
| create_card_label | `Novo onboarding` |
| expiration | 0 60 |

### Start Form Fields (7)

| Label | Type | Required | Options |
|---|---|---|---|
| Contato | `connector` | False |  |
| Empresa | `connector` | True |  |
| Tipo de contrato | `radio_horizontal` | False | Mensal, Anual, Outro |
| Qual outro tipo de contrato? | `short_text` | False |  |
| Valor total do contrato | `currency` | False |  |
| Informações do cliente | `long_text` | False |  |
| Descrição de serviços e produtos | `long_text` | False |  |

### Phases (6)


#### `342927237` — **Boas-vindas** 
> Gerencie negociações com o processo "Funil de Vendas"

| Label | Type | Required | Options |
|---|---|---|---|
| Segmentação de clientes | `label_select` | False |  |
| Responsável pelo onboarding | `assignee_select` | False |  |
| Foi possível agendar a reunião de boas-vindas? | `radio_horizontal` | False | Sim, Não |
| Data da reunião de boas-vindas | `due_date` | False |  |
| Dúvidas do cliente | `long_text` | False | Enviar e-mail de boas vindas, Conversa prévia com vendedor para entend… |
| *(statement/separador)* | `statement` | None |  |

#### `342927238` — **Implementação** 
> Ajude o cliente a implementar

| Label | Type | Required | Options |
|---|---|---|---|
| O que o cliente espera alcançar? | `long_text` | False | Treinamento com máximo de pessoas possível, Fazer o planning com o cli… |
| Como você pode ajudar o cliente a alcançar os objetivos? | `long_text` | False |  |
| Como a implementação deve acontecer? | `long_text` | False |  |
| Data de início da implementação | `date` | False |  |
| Data esperada de encerramento | `due_date` | False |  |
| *(statement/separador)* | `statement` | None |  |
| Data de conclusão da implementação | `date` | False |  |

#### `342927242` — **Treinamento/Acompanhamento** 
> Acompanhe o progresso da implementação e agende reuniões

| Label | Type | Required | Options |
|---|---|---|---|
| *(statement/separador)* | `statement` | None |  |
| Treinamento de equipe | `datetime` | False |  |
| Notas do treinamento | `long_text` | False |  |
| *(statement/separador)* | `statement` | None |  |
| Ligação de acompanhamento | `datetime` | False |  |
| Notas da ligação | `long_text` | False |  |

#### `342927239` — **Finalização** 
> Verifique se o cliente atingiu o objetivo esperado

| Label | Type | Required | Options |
|---|---|---|---|
| Checklist de encerramento do onboarding | `checklist_vertical` | False | O uso do cliente é estável, O cliente percebe valor ao usar o produto … |
| Feedback do cliente no processo de onboarding | `short_text` | False |  |
| O cliente atingiu os objetivos estabelecidos? | `radio_horizontal` | False | Sim, Não |
| Descrever o que ficou pendente | `long_text` | False |  |
| *(statement/separador)* | `statement` | None |  |

#### `342927240` — **Concluído** (done=True)
> Onboardings finalizados

| Label | Type | Required | Options |
|---|---|---|---|
| *(statement/separador)* | `statement` | None |  |
| Como você avalia o nosso Onboarding? | `radio_horizontal` | False | 1 ⭐, 2 ⭐, 3 ⭐, 4 ⭐, 5 ⭐ |
| Sinta-se a vontade para nos contar como foi a experiência! | `long_text` | False |  |

#### `342927241` — **Arquivado** (done=True)
> Onboardings não-concluídos

*(sem campos — phase terminal ou só navegação)*

### Labels (4)

- `Enterprise` — #48626F
- `Empresa Grande` — #FF5019
- `Empresa Média` — #FFB319
- `Empresa Pequena` — #009DFF

### Automations (1)

- **Criar card conectado (Pipeline de Vendas -> Onboarding de Clientes)- [CRM] Funil de Vendas** (`306954793`, active=True)
  - Event: `card_moved` → Action: `create_connected_card`


---

## Fontes
- Pipefy GraphQL API (`https://api.pipefy.com/graphql`)
- Queries executadas via skill `pipefy-integration` em 2026-04-20
- Org: `302461450` (Nxz Sistemas Inteligentes Ltda)
