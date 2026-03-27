---
execution: inline
agent: squads/nxz-clickup-setup/agents/configurator
inputFile: squads/nxz-clickup-setup/output/workspace-design.md
outputFile: squads/nxz-clickup-setup/output/configuration-log.md
---

# Step 06: Configurar ClickUp via MCP

## Context Loading

Load these files before executing:
- `squads/nxz-clickup-setup/output/workspace-design.md` — Design aprovado do workspace
- `squads/nxz-clickup-setup/pipeline/data/config-focus.md` — Departamentos e nível de customização
- `squads/nxz-clickup-setup/pipeline/data/anti-patterns.md` — Erros comuns a evitar

## Instructions

### Process
1. Ler o design aprovado do workspace
2. Usar `clickup_get_workspace_hierarchy` para verificar o estado atual do workspace
3. Para CADA departamento no design aprovado, executar em sequência:
   a. Criar Space usando `clickup_create_folder` (ou equivalente MCP)
   b. Criar Folders dentro do Space
   c. Criar Lists dentro de cada Folder com statuses customizados usando `clickup_create_list` / `clickup_create_list_in_folder`
   d. Adicionar Custom Fields usando `clickup_get_custom_fields` para verificar existentes
   e. Configurar automações quando disponível via MCP
4. Configurar Goals/OKRs conforme design (se disponível via MCP)
5. Criar Views relevantes por Space/List
6. Documentar cada ação executada em um log de configuração
7. Se alguma configuração não for possível via MCP, documentar como "manual action required"

### Notas Importantes
- Sempre verificar se o recurso já existe antes de criar (idempotente)
- Usar nomes exatamente como definidos no design aprovado
- Logar cada operação com timestamp e resultado (sucesso/falha)
- Se uma operação falhar, documentar o erro e continuar com as próximas

## Output Format

```markdown
# Log de Configuração ClickUp

## Resumo
- Total de operações: X
- Sucesso: X
- Falha: X
- Manual required: X

## Departamento: {Nome}

### Space: {nome}
- [✅/❌] Criado em {timestamp}

### Folder: {nome}
- [✅/❌] Criado em {timestamp}

### List: {nome}
- [✅/❌] Criada em {timestamp}
- Statuses: {lista}

### Custom Fields
- [✅/❌] {campo}: {tipo}

### Automações
- [✅/❌] {descrição}
- [⚠️ MANUAL] {descrição} — Não disponível via MCP

### OKRs
- [✅/❌] Goal: {nome}
  - Target: {nome}
```

## Output Example

```markdown
# Log de Configuração ClickUp

## Resumo
- Total de operações: 24
- Sucesso: 21
- Falha: 0
- Manual required: 3

## Departamento: Suporte

### Space: Suporte
- [✅] Criado em 2026-03-27 15:30:00 — ID: abc123

### Folder: Tickets
- [✅] Criado em 2026-03-27 15:30:15 — ID: def456

### List: Tickets Ativos
- [✅] Criada em 2026-03-27 15:30:30 — ID: ghi789
- Statuses: Novo, Em Triagem, Em Atendimento, Aguardando Cliente, Escalado, Resolvido

### Custom Fields
- [✅] Prioridade: Dropdown (Crítica, Alta, Normal, Baixa)
- [✅] Canal Origem: Dropdown (Email, Chat, Telefone, WhatsApp)
- [✅] SLA (horas): Number
- [✅] Satisfação: Rating (1-5)

### Automações
- [⚠️ MANUAL] Task created → Assign to on-duty agent — Automação não disponível via MCP
- [⚠️ MANUAL] Priority = Critical → Notify manager — Automação não disponível via MCP

### OKRs
- [⚠️ MANUAL] Goals API não disponível via MCP — Configurar manualmente
```

## Veto Conditions

1. Nenhuma operação de criação foi executada (tudo falhou)
2. Departamento selecionado completamente omitido do log
3. Nomes dos recursos criados não correspondem ao design aprovado

## Quality Criteria

- [ ] Cada departamento tem Space, Folders e Lists criados
- [ ] Custom Fields configurados conforme design
- [ ] Log documenta cada operação com resultado
- [ ] Ações manuais necessárias estão claramente listadas
- [ ] Nomes correspondem exatamente ao design aprovado
