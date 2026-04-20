---
execution: inline
agent: squads/nxz-pipefy-setup/agents/trainer
inputFile: squads/nxz-pipefy-setup/output/pipe-design.md
outputFile: squads/nxz-pipefy-setup/output/user-guide.md
required_skills:
  - pipefy-integration
---

# Step 09: Gerar Documentação e Guias

## Skill de referência

A documentação para usuário final **não** invoca a skill em runtime, mas deve
refletir fielmente o que foi configurado. Antes de escrever:

- Ler `squads/nxz-pipefy-setup/output/configuration-log.md` para saber o que foi criado
- Nomes de Pipes/Phases/Fields devem bater exatamente com o Pipefy real

## Context Loading

- `squads/nxz-pipefy-setup/output/pipe-design.md` — Design dos pipes
- `squads/nxz-pipefy-setup/output/configuration-log.md` — O que foi configurado
- `squads/nxz-pipefy-setup/output/audit-report.md` — Resultado da auditoria
- `squads/nxz-backoffice-processes/output/2026-04-16-165948/v6/process-design-document.md` — PDD
- `_opensquad/_memory/company.md` — Contexto Nexuz

## Instructions

### Process
1. Ler o design e o log de configuração
2. Gerar guias por público:

   **Para Ops de Vendas (Carol):**
   a. Como criar um novo lead (via Start Form ou card manual)
   b. Como preencher o Checklist Binário
   c. Como mover cards entre fases
   d. Como registrar demo, proposta, fechamento
   e. Como descartar (motivos obrigatórios)
   f. Como usar o pipe de Nutrição
   g. Quick reference card

   **Para Gestão (Walter):**
   a. Como acompanhar o funil (dashboards)
   b. Como aprovar descontos > 15%
   c. Como auditar semanalmente
   d. Métricas e onde encontrá-las

   **Para Financeiro (Sabrina):**
   a. Como marcar boleto emitido / pagamento confirmado
   b. Campos relevantes no Fechamento

   **Para Implantação (Matheus/Luiz):**
   a. Como receber o handoff
   b. O que vem no card de implantação

3. Documentar automações ativas (o que acontece automaticamente)
4. Gerar FAQ por perfil
5. Incluir diagrama Mermaid do fluxo visual

## Output Format

```markdown
# Guia de Uso Pipefy — Vendas Nexuz

## Visão Geral
(Diagrama Mermaid do fluxo + pipes conectados)

## Para Ops de Vendas

### Criar Novo Lead
1. ...

### Qualificar Lead (Checklist Binário)
1. ...

### Quick Reference
| Ação | Como Fazer |
...

## Para Gestão
...

## Para Financeiro
...

## Para Implantação
...

## Automações Ativas
| O que acontece | Quando | Quem é impactado |
...

## FAQ
### Ops de Vendas
- P: ...
  R: ...
```

## Veto Conditions

1. Algum perfil de usuário (Ops, Gestão, Financeiro, Implantação) não tem guia
2. Automações ativas não foram documentadas
3. Nomes não batem com o Pipefy real

## Quality Criteria

- [ ] Cada perfil de usuário tem seção dedicada
- [ ] Quick Reference para Ops de Vendas (ação mais frequente)
- [ ] Automações documentadas com trigger e efeito
- [ ] Linguagem acessível (não técnica)
- [ ] FAQ com pelo menos 3 perguntas por perfil
- [ ] Diagrama Mermaid incluído
