# Lote A — Guia Manual: 4 Alertas Tempo em Status

**Lista:** Vendas › CRM › Leads & Deals
**URL:** https://app.clickup.com/3086998/v/l/6-901712879969-1
**Responsável mencionado nos comentários:** @Carol Oliveira
**Tempo estimado:** ~15 min (4 automações × ~3 min)

## Por que manual?

A automação via Playwright avançou até o passo "escolher Tempo em Status como condição", mas o item **`Tempo em Status`** no dropdown de condições aparece como **desabilitado** mesmo com os ClickApps (Tempo em Status + Automações) ativados no Espaço Vendas e plano Business do workspace. O tooltip não informa o motivo — pode ser propagação lenta de cache da ClickUp, ou requisito extra do plano. Execução manual contorna o problema: o clique humano diferencia contexto de forma que o Playwright não reproduz.

**Se no seu teste manual o item ainda estiver cinza/desabilitado:** clique mesmo assim e observe se um popup de upgrade aparece, ou tente primeiro com o gatilho **Alterações de status** (em vez de A cada…) — em alguns workspaces o Tempo em Status só habilita nesse fluxo.

---

## Pré-requisitos (conferir antes)

1. Na barra lateral, passar o mouse em **Vendas** → clicar na engrenagem → **ClickApps** → confirmar:
   - ✅ **Tempo em Status** ativado
   - ✅ **Automações** ativado
2. Os status da lista Leads & Deals já devem existir (Sessão 1):
   `qualificado`, `primeiro contato`, `apresentação agendada`, `proposta enviada`

---

## Fluxo base (repetir para cada uma das 4)

### 1. Abrir o construtor de automação
1. Abrir a lista **Leads & Deals**
2. Clicar **Automatizar** (botão no topo da lista, ao lado de "Compartilhar")
3. No painel, clicar **Gerenciar** (caso ainda não esteja nessa aba)
4. Clicar **+ Adicionar Automação** (botão no topo)

### 2. Gatilho (Quando)
1. No campo **Quando…** clicar no botão do gatilho
2. Escolher **A cada…** (ícone de relógio/agendamento)
3. Configurar: **Diariamente** às **09:00**

> Alternativa se Tempo em Status não habilitar: escolha **Alterações de status** como gatilho. Nesse caso, na Sessão 3 documente que a regra dispara a cada mudança de status (ruído maior, mas funcional).

### 3. Condição 1 — Status
1. Clicar **+ Adicionar Condição**
2. No dropdown de campo, escolher **Status**
3. Clicar em **Qualquer Status** (botão que aparece ao lado)
4. Marcar **apenas o status específico da linha** (tabela abaixo)
5. Pressionar **Esc** ou clicar fora para fechar

### 4. Condição 2 — Tempo em Status
1. Clicar **+ Adicionar Condição** novamente
2. No dropdown de campo, escolher **Tempo em Status**
3. Operador: **é maior que**
4. Campo de valor: digitar o número + unidade conforme tabela (ex: `48` e selecionar **horas**, ou `7` e selecionar **dias**)

### 5. Ação (Então)
1. No campo **Então…** clicar no botão da ação
2. Escolher **Adicionar um comentário**
3. No editor que aparece, digitar `@` e selecionar **Carol Oliveira**
4. Colar o restante do texto conforme tabela abaixo
5. Verificar que a menção aparece como pílula azul (não texto literal)

### 6. Nomear e salvar
1. No campo **Nomear esta automação** no topo, colar o nome da tabela
2. Clicar **Criar** no rodapé do diálogo
3. Aguardar toast **"Automação criada"**
4. Voltar ao passo 1 para a próxima

---

## Tabela das 4 automações

| # | Nome | Status | Tempo em Status > | Comentário (após "@Carol Oliveira ") |
|---|------|--------|-------------------|--------------------------------------|
| 1 | `Alerta Qualificado sem avanço (>48h)` | `qualificado` | **48 horas** | `Lead qualificado há >48h sem avanço. Revisar próximo passo.` |
| 2 | `Alerta Primeiro contato estagnado (>16d)` | `primeiro contato` | **16 dias** | `Lead em primeiro contato há >16 dias. Considerar mover para Nutrição ou marcar como Perdido.` |
| 5 | `Alerta Apresentação sem follow-up (>48h)` | `apresentação agendada` | **48 horas** | `Apresentação agendada há >48h sem atualização. Confirmar realização e próximos passos.` |
| 7 | `Alerta Proposta sem retorno (>7d)` | `proposta enviada` | **7 dias** | `Proposta enviada há >7 dias sem retorno. Fazer follow-up ativo.` |

> **Nomes de status:** confirme a grafia exata no dropdown. Se aparecer em maiúsculas (`QUALIFICADO`), está correto — os status do ClickUp renderizam em caps mas a comparação é case-insensitive.

---

## Validação após criar as 4

1. Na aba **Gerenciar** do painel Automações, devem aparecer as **4 entradas**
2. Cada uma com o interruptor **Ativa** (verde) ligado
3. Abrir cada uma e conferir:
   - Gatilho: **A cada Diariamente 09:00**
   - 2 condições: **Status = <status>** + **Tempo em Status > <valor>**
   - Ação: **Adicionar um comentário** com menção `@Carol Oliveira` (pílula azul)

## Teste opcional (smoke test)

1. Criar uma task de teste na lista, mover para status `qualificado`
2. Aguardar 48h (ou ajustar temporariamente para `1 hora`, salvar, esperar, reverter)
3. Conferir se o comentário apareceu e se Carol recebeu notificação

---

## Próximos passos (fora deste lote)

- **Lote B (6 automações):** mudança de status → definir data de entrega + comentário de handoff
- **Lote C (4 automações):** notificações de mudança de etapa para #vendas (Slack ou ClickUp Chat)

Replanejar após Lote A rodar por ~1 semana em produção.

---

## Se algo der errado

- **Botão Criar cinza:** algum campo está vazio. Conferir gatilho, ambas condições e texto do comentário.
- **@Carol vira texto literal:** apagar e digitar `@` devagar; esperar o autocomplete abrir antes de selecionar.
- **Tempo em Status continua desabilitado:** usar gatilho **Alterações de status** como fallback e ajustar condições (remover Status, manter só Tempo em Status); resultado é equivalente para fins de alerta.
- **Toast de erro ao salvar:** print da tela e anotar o texto; provavelmente limite do plano ou conflito de nome.
