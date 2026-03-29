# Squad Memory: NXZ Context Briefings

## Learnings

### Run 2026-03-28-180822 — NXZ ERP / Marketing / Operacional

- **Usuario pediu ajuste de escopo durante review:** removeu integracao SAT (legislacao desatualizada) e pediu validacao das integracoes antes de incluir
- **Enriquecimento solicitado:** usuario quer briefings mais completos para marketing/vendas — incluir copy pronto, casos de uso por segmento e foco em franquias
- **Foco em franquias e importante:** multi-empresa/franquias e um diferencial-chave do NXZ ERP para o usuario
- **Dados reais do Odoo valorizam o briefing:** incluir contagens reais (pedidos, produtos, movimentacoes) da um peso extra ao conteudo
- **NXZ ERP nao tinha documentacao dedicada:** era o maior gap nos contextos existentes (9/12 docs cobriam NXZ Go)
- **Briefing aprovado e salvo como:** `(v_1.0) Briefing de Contexto - NXZ ERP - Marketing - Operacional.md`

### Run 2026-03-28-202417 — NXZ Go Totem / Marketing+Vendas / Operacional

- **Modos devem ser briefings separados:** usuario rejeitou briefing combinado dos 4 modos — cada modo (PDV, Totem, KDS, Smart POS) deve ter seu proprio briefing
- **"4 em 1" NAO e argumento de marketing:** usuario disse explicitamente que e "pouco atrativo comercialmente" — nao usar
- **Totem foi o primeiro modo escolhido:** proximo passo provavel e PDV, KDS ou Smart POS
- **Codebase como fonte adicional:** repositorio nxz_go_play_store foi usado como fonte — React Native 0.81.1, versao 5.13.1
- **Briefing aprovado e salvo como:** `(v_1.0) Briefing de Contexto - NXZ Go Totem - Marketing+Vendas - Operacional.md`
- **10 secoes, foco profundo em funcionalidades do Totem:** whitelabel, screensaver como marketing, fluxo completo 7 etapas, pagamentos, sessao automatica, catalogo, seguranca, NF
- **6 segmentos de caso de uso:** cafeteria, fast food, praca de alimentacao, franquias, padaria, evento/pop-up

### Run 2026-03-28-220027 — NXZ Go PDV / Marketing+Vendas / Operacional

- **PDV aprovado sem ajustes na primeira versao:** estrutura e profundidade do modelo Totem funcionam bem para outros modos
- **MCP Odoo nao estava ativado nesta run:** usuario pediu para pular — dados coletados via docs de contexto + codebase + dados da run anterior
- **Foco PDV vs Totem:** PDV e para o OPERADOR (funcionario), Totem e para o CLIENTE — narrativa e exemplos completamente diferentes
- **9 features exclusivas do PDV documentadas:** controle de caixa, modo restaurante, gestao de pedidos, edicao de preco, modal de cupom, pricelist, disponibilidade, dinheiro sem senha, drawer
- **Briefing aprovado e salvo como:** `(v_1.0) Briefing de Contexto - NXZ Go PDV - Marketing+Vendas - Operacional.md`
- **Diagrama PDV+Totem lado a lado foi bem recebido:** mostra que ambos alimentam a mesma fila no KDS

## Preferences

- Incluir secao de copy pronto (headlines, descricoes, CTAs) em briefings de marketing
- Incluir casos de uso por segmento de food service
- Validar integracoes antes de incluir — legislacao muda
- Dados reais do sistema enriquecem o briefing
