---
task: "Criar Guia de Uso"
order: 1
input: |
  - workspace_design: Design com fluxogramas e hierarquia
  - configuration_log: O que foi configurado
  - audit_report: Resultado da auditoria
output: |
  - user_guide: Guia completo organizado por departamento
---

# Criar Guia de Uso

Gerar guia de uso completo do ClickUp para cada departamento da Nexuz,
com instruções práticas, fluxogramas e documentação de automações.

## Process

1. Ler o design (fluxogramas, hierarquia) e o log de configuração
2. Para cada departamento configurado:
   a. Escrever seção "Como Usar no Dia a Dia" — ações comuns passo a passo
   b. Incluir fluxograma Mermaid do design como referência visual
   c. Documentar automações ativas (o que acontece automaticamente)
   d. Listar Custom Fields e como usá-los
   e. Escrever FAQ com perguntas que o time vai ter
3. Adicionar seção de OKRs: como atualizar progresso
4. Adicionar seção geral: visão do workspace, navegação entre Spaces

## Output Format

```markdown
# Guia de Uso ClickUp — Nexuz

## Visão Geral
...

## Departamento: {Nome}
### Como Usar no Dia a Dia
### Fluxo de Trabalho (Mermaid)
### Automações Ativas
### FAQ
```

## Output Example

(See Step 09 for a complete example)

## Quality Criteria

- [ ] Cada departamento tem seção dedicada
- [ ] Instruções orientadas a ação
- [ ] Fluxogramas incluídos
- [ ] Automações documentadas
- [ ] FAQ com mínimo 3 perguntas

## Veto Conditions

1. Departamento configurado sem guia
2. Guia sem fluxogramas Mermaid
