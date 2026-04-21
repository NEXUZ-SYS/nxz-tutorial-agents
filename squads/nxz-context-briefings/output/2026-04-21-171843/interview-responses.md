# Respostas da Entrevista

**Modo:** Playbook v1 pragmático — usuário optou por escrever agora usando PDD + Pipefy + contextos existentes, e marcar gaps com `[a confirmar com Carol]` ou `[preencher com exemplo real]` para uma segunda passagem.

## 1. Características únicas da suíte Nexuz

**Fonte usada:** Contextos v0.4 Negócios, v0.2 Produtos, briefings v1.0 por módulo.

- Suíte integrada ponta-a-ponta (ERP Odoo 12 + Go Totem/PDV/Smart POS + KDS + Delivery + Pay Go) — concorrência vende módulos isolados.
- Personalização de identidade visual no Totem (cliente coloca a cara da marca no autoatendimento).
- KDS recebe pedidos de até 5 fontes simultâneas (PDV, Totem, iFood, Rappi, Open Delivery) — consolidação real de canais.
- Dados reais operacionais citáveis como prova social: 3.184 pedidos processados, R$ 146.715 em vendas, ticket médio R$ 46,07.
- Infra Oracle Cloud + LGPD + integrações homologadas com Stone/Cielo/PagSeguro/SumUp + iFood/Rappi.

`[a confirmar com Carol]` — lista oficial de diferenciais que o time usa hoje em pitch de venda (validar se estes são os 5 mais citados).

## 2. Mercado e contexto de uso

**Fonte:** Negócios v0.4, PDD §3.1 (ICP QS vs FS).

- Food Service "To Go": restaurantes, bares, cafés, food trucks, catering, franquias + qualquer negócio em digitalização.
- 2 segmentos de ICP no PDD:
  - **QS (Quick Serve)** — ticket menor, decisão rápida, demo simplificada ~15min, proposta por mensagem.
  - **FS (Full Service)** — ticket maior, comitê, demo consultiva ~30min, proposta PDF com diagnóstico.
- `[a confirmar com Carol]` — critérios numéricos exatos: faturamento mínimo, nº de unidades mínimo. PDD diz "a calibrar D+30".

## 3. Integração com outros produtos Nexuz

**Fonte:** PDD §3, pipe-design.md, briefings v1.0 por módulo.

- NXZ Go → NXZ KDS: pedido do Totem/PDV/Smart POS vai direto para a tela da cozinha (sem garçom intermediário).
- NXZ ERP ↔ todos: motor financeiro/fiscal/estoque obrigatório — não há venda avulsa de Go/KDS sem ERP backend.
- NXZ Delivery ↔ KDS: pedido iFood/Rappi cai centralizado no KDS.
- NXZ Pay Go ↔ Go (modos PDV e Smart POS): captura de pagamento mobile integrada.
- Cross-venda natural: começa por Go (modo Totem ou PDV) + KDS, depois expande para Delivery/Pay Go.

## 4. Dores e problemas que resolve

**Fonte:** Negócios v0.4 (5 dores canônicas), PDD §5A F-Qualificação (dor obrigatória).

1. **Comunicação ineficiente** entre salão ↔ caixa ↔ cozinha → NXZ Go + KDS.
2. **Controle de estoque deficiente** (produção, perdas, reposição) → NXZ ERP.
3. **Gestão financeira complexa** (fluxo de caixa, conciliação, fiscal) → NXZ ERP.
4. **Experiência do cliente insatisfatória** (fila, erro de pedido, demora) → NXZ Go + KDS.
5. **Implementação demorada** de outros sistemas → SaaS Nexuz (onboarding rápido, consultoria FS).

`[a confirmar com Carol]` — quais dessas dores são as TOP 3 que fecham venda hoje (ranking real).

## 5. Informações adicionais / Gaps para segunda passagem

**Marcações `[a confirmar]` que ficam no playbook v1 para Carol/Walter preencherem:**

1. Tabela de preços operacional (preço base × desconto máx. sem escalação). PDD §15.1 cita planilha interna confidencial.
2. Top 15 objeções reais que o Ops escuta no campo com respostas canônicas (hoje playbook usa inferências dos briefings de módulo + PDD).
3. Scripts de abertura por origem (cold WhatsApp outbound vs inbound response vs indicação).
4. Templates de WhatsApp (canal primário R35 não tem templates automatizados — só 4 templates de e-mail ET-01 a ET-04).
5. Roteiro de demo QS detalhado (15min, wow moments) e FS (30min, diagnóstico).
6. Critérios numéricos de ICP (faturamento/unidades mínimos).
7. Template de proposta PDF FS (estrutura: diagnóstico → solução → rollout → preço → data de resposta).
8. Cases reais citáveis (No. Coffee multi-unidade citado, validar outros).
9. Gatilhos de urgência aceitáveis específicos de Food Service (sazonalidade, abertura de unidade, troca de adquirente).
10. Roteiro de handoff verbal para Implantação no GANHO (além do pacote digital automático R40).

**Nota:** Playbook v1 usa **inferências fundamentadas** dessas lacunas (ex: propõe 15 objeções plausíveis, scripts genéricos, gatilhos éticos). A v2 substitui pelos reais após revisão.
