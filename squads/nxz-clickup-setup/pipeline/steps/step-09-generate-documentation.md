---
execution: inline
agent: squads/nxz-clickup-setup/agents/trainer
inputFile: squads/nxz-clickup-setup/output/workspace-design.md
outputFile: squads/nxz-clickup-setup/output/user-guide.md
required_skills:
  - clickup-integration
---

# Step 09: Gerar Documentação e Guias

## Skill de referência

A documentação para usuário final **não** invoca a skill em runtime, mas deve
refletir fielmente o que a skill configurou. Antes de escrever:

- Ler `squads/nxz-clickup-setup/output/configuration-log.md` para saber qual
  interface criou cada coisa (MCP / API v2 / Playwright CLI)
- Se houver guias manuais gerados (`phase-X-manual-guide.md` quando converged-ai
  falhou), **incluir no guia final** como "Automações configuradas manualmente"
- Nomes de Spaces/Folders/Lists/Fields devem bater exatamente com o ClickUp real

## Context Loading

Load these files before executing:
- `squads/nxz-clickup-setup/output/workspace-design.md` — Design do workspace (fluxogramas, hierarquia)
- `squads/nxz-clickup-setup/output/configuration-log.md` — O que foi efetivamente configurado
- `squads/nxz-clickup-setup/output/audit-report.md` — Resultado da auditoria
- `squads/nxz-clickup-setup/output/**/phase-*-manual-guide.md` — Guias manuais (se existirem)
- `_opensquad/_memory/company.md` — Contexto da empresa Nexuz

## Instructions

### Process
1. Ler o design do workspace e o log de configuração
2. Para cada departamento configurado, gerar:
   a. Guia de uso do departamento (como usar o ClickUp no dia a dia)
   b. Quick reference card (1 página com os comandos/ações mais usados)
   c. Guia de automações configuradas (o que acontece automaticamente)
3. Gerar seção de OKRs: como atualizar progresso, cadência de check-ins
4. Incluir os fluxogramas Mermaid do design como referência visual
5. Gerar seção de FAQ com perguntas comuns por departamento
6. Compilar tudo em um documento único organizado por departamento

## Output Format

```markdown
# Guia de Uso ClickUp — Nexuz

## Visão Geral
(Hierarquia do workspace com diagrama Mermaid)

## Departamento: {Nome}

### Como Usar no Dia a Dia
1. ...

### Fluxo de Trabalho
(Fluxograma Mermaid)

### Quick Reference
| Ação | Como Fazer |
...

### Automações Ativas
| O que acontece | Quando |
...

### FAQ
- P: ...
  R: ...

## OKRs — Como Atualizar
...
```

## Output Example

```markdown
# Guia de Uso ClickUp — Nexuz

## Departamento: Suporte

### Como Usar no Dia a Dia

**Criar um novo ticket:**
1. Acesse o Space "Suporte" → Folder "Tickets" → List "Tickets Ativos"
2. Clique em "+ Add Task"
3. Preencha: Título, Descrição, Prioridade, Canal Origem, Cliente, Produto
4. O ticket será automaticamente atribuído ao agente de plantão

**Atualizar um ticket:**
1. Mova o card no Board para o status correto
2. Adicione comentários com atualizações
3. Se precisar escalar, mude o status para "Escalado"

**Fechar um ticket:**
1. Quando resolvido, mude para "Resolvido"
2. O sistema enviará pesquisa de satisfação automaticamente

### Quick Reference
| Ação | Como Fazer |
|---|---|
| Novo ticket | + Add Task no List "Tickets Ativos" |
| Mudar prioridade | Editar Custom Field "Prioridade" |
| Escalar | Status → "Escalado" |
| Ver meus tickets | Board View → filtrar por Assignee |
| Ver SLA | Calendar View |

### Automações Ativas
| O que acontece | Quando |
|---|---|
| Ticket atribuído automaticamente | Novo ticket criado |
| Gerente notificado | Prioridade = Crítica |
| Alerta de SLA | SLA > 80% do tempo |
| Pesquisa de satisfação | Ticket resolvido |
```

## Veto Conditions

1. Algum departamento configurado não tem guia de uso
2. Guia não inclui os fluxogramas Mermaid do design
3. Automações que viraram guia manual não foram incorporadas ao user-guide

## Quality Criteria

- [ ] Cada departamento tem seção "Como Usar no Dia a Dia"
- [ ] Quick Reference com pelo menos 5 ações por departamento
- [ ] Automações documentadas com trigger e action
- [ ] Fluxogramas Mermaid incluídos
- [ ] Linguagem acessível (não técnica) para usuários finais
- [ ] FAQ com pelo menos 3 perguntas por departamento
