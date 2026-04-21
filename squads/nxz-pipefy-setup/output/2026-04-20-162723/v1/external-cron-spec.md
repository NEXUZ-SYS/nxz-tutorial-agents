# External Cron Spec — Automações Pipefy Deferidas

5 automações do PDD não podem ser nativas no Pipefy por limitações do event×action blacklist ou estrutura `sla_based` (só aceita um par `late`+`expired` por fase). Devem rodar em cron externo (n8n, Google Cloud Scheduler, GitHub Actions, etc.) consultando a API pública do Pipefy.

## Contexto da limitação

- **scheduler event**: bloqueia `send_email_template`, `send_http_request`, `update_card_field` — só aceita `schedule_create_card`. Inviável para cadências ou alertas.
- **sla_based event**: tem apenas dois thresholds por fase (`late` e `expired`). Uma 3ª threshold na mesma fase não é representável.
- Qualquer automação que precise de múltiplos disparos temporais além dos 2 nativos precisa de cron externo.

## Automações deferidas

| ID | Nome | Motivo | Gatilho externo | Ação |
|----|------|--------|-----------------|------|
| A-05 | Cadência Qualificação D+3 (ET-02) | 2º threshold em Qualif (late já usado por A-04, expired já usado por A-07) | Diário às 09:00 — query cards em Qualif com `time_in_phase >= 3 AND time_in_phase < 7` | Enviar email template ET-02 (id=309594744) |
| A-06 | Cadência Qualificação D+7 (ET-03) | 3º threshold em Qualif | Diário às 09:00 — query cards em Qualif com `time_in_phase >= 7 AND time_in_phase < 15` | Enviar email template ET-03 (id=309594745) |
| A-10 | Cadência Proposta D+15 (alerta interno) | 3º threshold em Proposta (late=A-08, expired=A-09) | Diário às 09:00 — query cards em Proposta com `time_in_phase >= 15` AND não em GANHO/DESCARTE | POST `https://nexuz.com.br/api/webhook/pipefy/alerta-proposta-15d` |
| A-15 | Cadência Qualificação (conflito com A-04) | Mesma fase/kind `late` já usado por A-04 | N/A — mesclado ao design de A-04 (pode remover do PDD) | — |
| A-16 | Ping diário status geral | scheduler não aceita `send_http_request` | Diário às 08:00 — sem query (tick puro) | POST `https://nexuz.com.br/api/webhook/pipefy/daily-ping` |

## Query template (GraphQL público Pipefy)

Para A-05, A-06, A-10 — usar `allCards` filtrado por `current_phase`:

```graphql
query CardsInPhase($pipeId: ID!, $phaseId: ID!) {
  pipe(id: $pipeId) {
    phases(ids: [$phaseId]) {
      cards_count
      cards(first: 100) {
        edges {
          node {
            id
            title
            current_phase { id name }
            phases_history { phase { id name } firstTimeIn lastTimeOut duration }
            fields { name value }
          }
        }
      }
    }
  }
}
```

No código cron, filtrar pelo `time_in_phase` (diferença entre `firstTimeIn` da fase atual e agora) nos thresholds desejados.

## Implementação sugerida

- **Ferramenta**: n8n self-hosted, Google Cloud Scheduler + Cloud Run, ou GitHub Actions + cron.
- **Frequência**: diário às 09:00 BRT (enviar emails antes do início do dia comercial).
- **Endpoint webhook Nexuz**: `https://nexuz.com.br/api/webhook/pipefy/{nome}` — a criar.
- **Idempotência**: gravar última execução por card+regra em KV store (Redis/Firestore) para não re-enviar email no mesmo dia.
- **PII / LGPD**: logar só `card_id` + nome da regra. Nunca conteúdo do deal.

## IDs de referência

- pipe: `307117441`
- Qualif phase: `342928170`
- Proposta phase: `342928173`
- ET-02: `309594744`
- ET-03: `309594745`
