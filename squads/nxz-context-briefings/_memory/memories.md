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

### Run 2026-04-02-150159 — NXZ Go Smart POS / Marketing / Operacional

- **Aprovado sem ajustes na primeira versao:** estrutura consolidada dos briefings Totem/PDV funciona bem para Smart POS
- **Smart POS nao tem URL web para explorar:** roda em maquininhas fisicas — dados coletados via MCP Odoo + contexto tecnico existente
- **Doc tecnico existente (V_0.1) excelente mas 100% tecnico:** zero linguagem de marketing — principal trabalho foi traduzir features tecnicas em beneficios
- **Narrativa central Smart POS:** OPERADOR MOVEL — diferencia de Totem (CLIENTE) e PDV (CAIXA FIXO)
- **7 diferenciais-chave:** PDV no bolso, pagamento nativo, impressao integrada, multi-fabricante, offline-first, whitelabel, integracao KDS
- **6 segmentos de caso de uso:** food truck/ambulante, garcom na mesa, evento/pop-up, delivery na entrega, operacao compacta, rede/franquia movel
- **8 argumentos para objecoes documentados:** incluindo "maquininha so cobra", "tela pequena", "ja tenho caixa"
- **Briefing aprovado e salvo como:** `(v_1.0) Briefing de Contexto - NXZ Go Smart POS - Marketing - Operacional.md`
- **Proximo modo provavel:** KDS (unico modo restante sem briefing dedicado)

### Run 2026-04-02-155041 — NXZ Go (Todos os Modos) / Sales / Operacional

- **Primeiro briefing agrupado:** usuario pediu briefing consolidado cobrindo Totem + PDV + Smart POS para vendas
- **KDS NAO e modo do NXZ Go:** usuario deixou claro que KDS e sistema de cozinha separado, nao incluir como "modo"
- **Pricing e confidencial:** nao incluir valores no briefing — vendedor recebe tabela separada
- **Concorrentes nomeados:** POS tradicionais (Linx, TOTVS, Saipos, Goomer, Consumer) + autoatendimento (Anota AI, Goomer, Menu Digital iFood)
- **Matriz de decisao em 3 dimensoes:** tipo de operacao, tamanho do negocio, dor principal
- **3 wow moments para demo:** whitelabel instantaneo, pedido→KDS 2s, multi-modo no mesmo app
- **Aprovado sem ajustes na primeira versao:** estrutura de 12 secoes funcionou bem
- **Briefing aprovado e salvo como:** `(v_1.0) Briefing de Contexto - NXZ Go - Sales - Operacional.md`

### Run 2026-04-21-171843 — Playbook de Vendas (Suite Nexuz) / Sales-Ops / Operacional

- **Primeiro briefing tipo "playbook de processo", nao "briefing de produto":** artefato e sobre COMO vender, nao sobre O QUE e o produto — Step 05 Navigator (Playwright) pulado deliberadamente com justificativa no `product-exploration.yaml`
- **Duas fontes externas foram espinha dorsal:** PDD canonico de vendas (`nxz-backoffice-processes` run 2026-04-16-165948/v6) + design do Pipe Pipefy (`nxz-pipefy-setup` run 2026-04-20-162723/v1). Playbook aterra 1:1 em ambos.
- **Modo "Playbook v1 pragmatico":** usuario optou por escrever agora com `[a confirmar com Carol]` inline em vez de rodar entrevista cheia — 14 gaps viraram 10 itens de v2 no `state.json`. Entregavel ~50KB em menos tempo que uma entrevista completa.
- **Defaults inferidos dos args evitaram checkpoint redundante:** usuario rejeitou AskUserQuestion de 4 perguntas reconfirmando produto/publico/nivel/objetivo ja claros nos args (`playbook de vendas qualificacao/fechamento para tipo de ops da nxz`). Salvo como memoria global `feedback_proceed_without_over_questioning`.
- **Mudanca de referencia durante execucao:** usuario trocou nxz-clickup-setup por nxz-pipefy-setup via ESC + comando novo. Context Briefings deve ser flexivel a isso — ler referencia atual, nao assumir a primeira.
- **Estrutura de 12 secoes serviu bem:** Visao geral > ICP+Comite > S1 Entrada > S2 Qualificacao > S3+S4 Demo > S5 Proposta > S6+S7 Fechamento > Objecoes > Descarte/Nutricao > Mapa Pipefy > Templates > Checklist diario. Mapa PDD-Pipefy no final e referencia rapida de campo.
- **Reproducao LITERAL dos 4 templates ET-01..ET-04 do Pipefy:** playbook ganhou consistencia — vendedor ve no playbook exatamente o que o automatico vai enviar.
- **Banco de 25+ objecoes por etapa (4 S2 + 3 S3/S4 + 14 S5 + 4 S6):** mesmo como v1 inferida, ja da bagagem; v2 substitui pelo real do campo.
- **Playbook aprovado e salvo como:** `(v_1.0) Playbook de Vendas - Suite Nexuz - Sales-Ops - Operacional.md` em `context/`.
- **Proxima iteracao sugerida:** v2 com input da Carol preenchendo os 10 gaps; ou rodar `nxz-context-briefings` em nivel Tatico (metricas, SLA, forecast) ou Estrategico (ICP, GTM, estrutura comercial).

## Preferences

- Incluir secao de copy pronto (headlines, descricoes, CTAs) em briefings de marketing
- Incluir casos de uso por segmento de food service
- Validar integracoes antes de incluir — legislacao muda
- Dados reais do sistema enriquecem o briefing
- Para briefings tipo "playbook de processo" (vs briefing de produto): pular Step 05 Navigator se artefato nao depende de tela; usar PDD + design de ferramenta como espinha dorsal
- Preferir "playbook v1 pragmatico com [a confirmar]" sobre entrevista extensa quando usuario sinaliza urgencia
