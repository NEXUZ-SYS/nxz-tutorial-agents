# Domain Framework — Pipefy para Vendas B2B Food Service

## Contexto de domínio

A Nexuz é uma empresa de tecnologia SaaS para Food Service que precisa instrumentar
seu funil comercial de vendas. O processo foi formalizado no PDD (Process Design
Document) pela squad `nxz-backoffice-processes`.

## Mapeamento PDD → Pipefy

### Estrutura principal

| PDD | Pipefy | Notas |
|---|---|---|
| Funil de Vendas (9 etapas) | Pipe "Vendas" | 3 sub-etapas entrada + 5 sequenciais + 2 terminais |
| Nutrição (pipe paralelo) | Pipe "Nutrição" | 2 ciclos de 30d + descarte auto D+67 |
| Implantação (handoff) | Pipe "Implantação" | Recebe card via connector no GANHO |
| Contas (empresas) | Database "Contas" | Master data, CNPJ único |
| Contatos (pessoas) | Database "Contatos" | N:1 com Contas |
| Deals (oportunidades) | Cards no Pipe Vendas | 1:1 com Conta, N:1 com Contatos |

### Fases do Pipe Vendas

| # | PDD Etapa | Pipefy Phase | done? |
|---|---|---|---|
| 1 | Novo Lead (Inbound/Outbound/Indicação) | Novo Lead | false |
| 2 | Qualificação | Qualificação | false |
| 3 | Demo Agendada | Demo Agendada | false |
| 4 | Pós-demo | Pós-demo | false |
| 5 | Proposta | Proposta | false |
| 6 | Fechamento | Fechamento | false |
| 7 | GANHO | GANHO | true |
| 8 | DESCARTE | DESCARTE | true |

Sub-etapas de entrada (1A/1B/1C) são diferenciadas via campo "Origem" (dropdown)
na phase "Novo Lead", não como phases separadas.

### Connector architecture

```
Database "Contas" ←(1:N)— Database "Contatos"
        ↑ (1:1)
Pipe "Vendas" (Deal card)
        ↓ (1:1, no GANHO)
Pipe "Implantação" (Handoff card)

Pipe "Vendas" ←(1:1)→ Pipe "Nutrição" (quando lead vai para nutrição)
```

## Regras de negócio críticas para configuração

1. **Gates de progressão**: campos required por phase bloqueiam movimentação
2. **Motivo de descarte obrigatório**: dropdown com 9 motivos + campos condicionais
3. **Checklist Binário**: 6 campos booleanos que devem ser true para sair de Qualificação
4. **Transição automática GANHO**: quando Pagamento confirmado AND Contrato assinado
5. **Descarte automático D+67**: nutrição sem decisão → descarte com motivo "Nutrição expirada"
6. **CNPJ único**: validação de duplicidade em contas ativas

## Persona dos usuários

| Papel | Pessoa | Uso principal |
|---|---|---|
| Ops de Vendas | Carol | Criar leads, qualificar, demos, propostas, fechar |
| Gestão/Sponsor | Walter | Dashboards, aprovação desconto >15%, auditoria |
| Financeiro | Sabrina | Marcar boleto/pagamento no Fechamento |
| Implantação | Matheus/Luiz | Receber handoff, acolher cliente |
