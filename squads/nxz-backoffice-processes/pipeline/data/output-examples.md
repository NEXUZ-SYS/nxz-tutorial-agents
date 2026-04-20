# Output Examples — PDDs de referência

Dois exemplos completos (realistas, tool-agnostic) que demonstram o padrão de qualidade do squad.

---

## Exemplo 1 · Onboarding & aprovação de novo fornecedor

**Processo:** Onboarding e aprovação de novo fornecedor — ID: P-FIN-014
**Owner:** Head de Compras · **Versão:** 2.1 · **Review:** semestral · **Effective:** 2026-04-01

### Purpose & scope
Validar e ativar novos fornecedores com controle de risco (fiscal, sanções, fraude bancária) antes de qualquer comprometimento de gasto.
- **In-scope:** fornecedores pessoa jurídica, contratos recorrentes e pontuais.
- **Out-of-scope:** reembolsos de colaboradores, compras emergenciais < R$ 1k.
- **Trigger:** área requisitante submete New Vendor Request com dados fiscais, bancários e contato.
- **End events:** (a) fornecedor aprovado e ativo no cadastro; (b) fornecedor rejeitado com motivo documentado.

### Swimlane narrativo (happy path)
- *Requester lane:* Submit New Vendor Request (anexa documentação fiscal, bancária, declaração assinada).
- *Procurement Analyst lane:* Valida completeness (**BR-001**). Se incompleto → EX-01 (devolve ao requester).
- *Compliance lane:* Executa triagem de sanções / PEP / status fiscal (**BR-002**). Hit → escala L2 (Compliance Manager).
- *Finance Analyst lane:* Valida dados bancários com dual control (**BR-003**). Holder name precisa coincidir com CNPJ.
- *Procurement Manager lane:* Aprova se risk score ≤ 40 e spend anual ≤ R$ 500k; senão → CFO (**BR-004**).
- *Vendor Master lane:* Ativa registro; notifica requester.

### RACI (excerpt)
| Atividade | Requester | Proc. Analyst | Compliance | Finance | Proc. Manager | CFO |
|-----------|-----------|---------------|------------|---------|---------------|-----|
| Submeter requisição | R/A | I | - | - | - | - |
| Validar completeness | C | R/A | - | - | I | - |
| Screening compliance | - | I | R/A | - | I | - |
| Validação bancária | - | C | - | R/A | I | - |
| Aprovar (≤ R$ 500k) | I | C | C | C | R/A | I |
| Aprovar (> R$ 500k) | I | C | C | C | R | A |

### Business rules
- **BR-001:** Requisição é completa se CNPJ + endereço + bancário + contato + declaração assinada estão presentes.
- **BR-002:** Qualquer hit em sanções/PEP/status fiscal irregular → escalação L2.
- **BR-003:** Nome do titular bancário deve coincidir com razão social/CNPJ; divergência → controle C-07.
- **BR-004:** Spend anual estimado > R$ 500k exige aprovação CFO independentemente do risk score.

### KPIs
| KPI | Fórmula | Target | Threshold | Owner | Fonte | Cadência |
|-----|---------|--------|-----------|-------|-------|----------|
| Cycle time onboarding | end_date − submission_date (dias úteis) | ≤ 5 | 7 | Proc. Manager | Registro de requisições | Semanal |
| First-pass completeness rate | completos / total submissões | ≥ 85% | 75% | Proc. Analyst | Registro de requisições | Mensal |
| Rejected vendor rate | rejeitados / total | ≤ 5% | 10% | Compliance Mgr | Registro de decisões | Mensal |

### SLAs
- Completeness validation: 1 dia útil. Breach: auto-notify lane owner, L2 em 2× SLA.
- Compliance screening: 2 dias úteis. Breach: escalação Compliance Mgr.
- Bank validation: 1 dia útil. Breach: escalação Finance Lead.

### Risk & control matrix
- **R-01 Fornecedor fictício** → C-01 Sanctions screening (preventivo, cada requisição, Compliance).
- **R-02 Fraude bancária** → C-07 Holder-CNPJ match + dual control (preventivo, cada requisição, Finance).
- **R-03 Comprometimento não autorizado** → C-12 Threshold rule (preventivo, cada requisição, Proc. Mgr).
- **R-04 Duplicata de fornecedor** → C-15 Check duplicate CNPJ (detectivo, batch mensal, Vendor Master).

### Exceções
- **EX-01 Requisição incompleta** → devolve ao Requester; SLA de resolução 2 dias; 2 devoluções escalam ao manager do Requester.
- **EX-02 Red flag de compliance** → freeza requisição; escalação Compliance Mgr em 4h; decisão CFO obrigatória.
- **EX-03 Bank validation falha após aprovação** → rollback da aprovação, registro de incidente, re-validação obrigatória.

### Compliance (LGPD)
- **Base legal:** Art. 7º, V (execução de contrato) para dados fiscais e bancários do fornecedor.
- **Retenção:** 5 anos após término do último contrato (obrigação fiscal).
- **Direitos do titular:** fluxo de resposta em 15 dias via canal oficial; minimização aplicada aos contatos cadastrados.

### Governance
- **Owner:** Head de Compras. **Aprovador alternativo:** CFO.
- **Review cadence:** semestral ou após qualquer mudança regulatória.
- **Change log:** v2.1 (2026-04-01) — adicionada triagem PEP e dual-control bancário.

---

## Exemplo 2 · Escalação de ticket de suporte crítico (excerpt)

**Processo:** Escalação de ticket crítico de suporte — ID: P-CS-032
**Owner:** Head de Customer Success · **Versão:** 1.3

### Purpose & scope
Garantir resolução ou escalação de tickets classificados como críticos (outage, impacto fiscal, risco de perda de receita) em SLA ≤ 2h.

### Swimlane narrativo
- *CS Agent lane:* Recebe ticket, classifica severidade (**BR-010**). Se crítico → cria war-room alert.
- *CS Manager lane:* Assume ownership em 15min; comunica cliente (**BR-011**).
- *Engineering on-call lane:* Investiga causa; se indisponibilidade sistêmica → workaround (**BR-012**) + fix.
- *CS Manager lane:* Root cause analysis 24h após resolução; publica post-mortem.

### KPIs
| KPI | Target | Owner |
|-----|--------|-------|
| Tempo até acknowledge (crítico) | ≤ 15 min | CS Manager |
| Tempo até resolução (crítico) | ≤ 2h | CS Manager + Eng Lead |
| Post-mortem publicado em 48h | 100% | CS Manager |

### Exceções
- **EX-10 Cliente não responde em 30min** → CS continua com workaround documentado.
- **EX-11 Causa raiz é de terceiro (gateway de pagamento, por exemplo)** → escalação para vendor management + comunicação pública se impacto > 100 clientes.

### LGPD & auditabilidade
- Log de todos os acessos a dados do ticket mantido 5 anos.
- Base legal: legítimo interesse (art. 7º, IX) + execução de contrato.

---

> **Ambos os exemplos:** nenhuma menção a sistemas específicos. Tudo descrito como papéis, dados, decisões e controles. Essa é a referência de qualidade.
