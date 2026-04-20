# Anti-Patterns — armadilhas que o squad combate ativamente

Cada anti-padrão inclui o **porquê** é nocivo e **como evitar**.

## Anti-padrões de briefing

### 1. Solução disfarçada de demanda
O requester diz "preciso de um dashboard" quando o problema real é dado faltante upstream.
**Por que dói:** você constrói o sintoma, não a cura. O problema retorna em outro lugar.
**Como evitar:** reextraia o problema com 5 Whys antes de aceitar qualquer demanda que já nomeie o entregável.

### 2. Single-source bias
Entrevistar só o reclamante ou só o gestor.
**Por que dói:** a realidade de quem executa fica invisível; variantes e workarounds somem.
**Como evitar:** mapear Power/Interest grid e entrevistar executor + sponsor + cliente do processo.

### 3. Pular análise de causa raiz
Desenhar o TO-BE no nível do sintoma.
**Por que dói:** a causa reproduz o mesmo problema em outro passo.
**Como evitar:** 5 Whys obrigatório para toda dor listada.

### 4. Briefing verbal
Problema "combinado" em call sem registro escrito.
**Por que dói:** ambiguidade garantida; o escopo muda a cada semana.
**Como evitar:** problem statement escrito + read-back + sign-off do sponsor.

### 5. Sem baseline
Desenhar sem medir a performance atual.
**Por que dói:** melhoria impossível de provar; regressão invisível.
**Como evitar:** coletar 8-12 semanas de baseline antes de definir target.

## Anti-padrões de mapeamento

### 6. Mapear o ideal, não o real
Gestores descrevem como "deveria funcionar".
**Por que dói:** as verdadeiras causas de delay e rework ficam fora do mapa.
**Como evitar:** shadowing e entrevistas com executor; pedir para narrar o último caso real.

### 7. Island mapping
Charting de um time sem upstream/downstream.
**Por que dói:** handoffs entre funções (onde o valor vaza) ficam invisíveis.
**Como evitar:** SIPOC primeiro; incluir ao menos um passo antes do start e um depois do end event.

### 8. Over-detailing
Clicar e campo em um único canvas.
**Por que dói:** leadership não consegue priorizar; mapa vira inútil.
**Como evitar:** hierarquizar — um nível por audiência (estratégico, operacional, execução). Colapsar em sub-processos.

### 9. Gateways implícitos
Múltiplos fluxos saindo de uma atividade sem gateway.
**Por que dói:** lógica ambígua, execução inconsistente.
**Como evitar:** cada decisão em gateway explícito com condições mutuamente exclusivas e exaustivas.

### 10. Naming inconsistente
"Aprovar PO", "Aprovação de PO", "Sign-off" para a mesma atividade.
**Por que dói:** mapa inutilizável para análise ou automação.
**Como evitar:** padronizar verbo + objeto (ex: "Validar fatura"); events em particípio passado ("Fatura recebida").

## Anti-padrões de design / documentação

### 11. Tool-brand contamination (crítico para este squad)
Procedimentos referenciam telas, botões, campos de software específico.
**Por que dói:** doc fica obsoleto a cada mudança de ferramenta; oculta a lógica de negócio real; viola o princípio de arquitetura tool-agnostic.
**Como evitar:** descrever **capability** ("validação automatizada de CNPJ"), **papel** ("analista de compras"), **dado** ("CNPJ"), **decisão** ("aprovar/rejeitar"). Nunca "clicar em X no sistema Y".

### 12. RACI com dois A's ou nenhum A
Accountability dispersa ou ausente.
**Por que dói:** ninguém decide; ninguém se responsabiliza.
**Como evitar:** regra dura — exatamente 1 A por atividade; linha sem A é blocker.

### 13. KPI sem target ou método
"Melhorar cycle time" não é KPI.
**Por que dói:** improvement não mensurável.
**Como evitar:** SMART completo — definição, fórmula, unidade, baseline, target, threshold, owner, cadência, fonte.

### 14. Compliance theater
Doc escrito para satisfazer auditoria, ignorado por operadores.
**Por que dói:** processo real diverge do documentado; controles em papel.
**Como evitar:** read-aloud test com operador novo; controles com evidência de execução.

### 15. Happy-path only
Sem caminhos de exceção.
**Por que dói:** doc quebra na primeira divergência da realidade.
**Como evitar:** mínimo 3 exceções nomeadas com handler, SLA, escalação.

### 16. Disagreement entre narrativa e diagrama
Texto diz uma coisa, swimlane outra.
**Por que dói:** sem single source of truth.
**Como evitar:** narrativa descreve o diagrama; qualquer mudança força update nos dois.

## Anti-padrões de governança e revisão

### 17. Rubber-stamping
Aprovar porque o sponsor é senior, não porque passa na rubrica.
**Como evitar:** revisor aplica rubrica independente do sponsor; veredicto precisa justificar cada dimensão.

### 18. Controles de papel
Controles existem no doc mas nunca testados.
**Como evitar:** cada controle tem owner + frequência + evidência esperada.

### 19. LGPD como afterthought
Base legal e retenção bolted-on depois do go-live.
**Como evitar:** LGPD by design no step-05 (Paula Processo) e auditado no step-07 (Raquel Revisão).

### 20. SoD violations escondidas em automação
Uma service account ou uma pessoa fazendo request + approval + payment.
**Como evitar:** SoD check específico na rubrica; papéis em transações materiais obrigatoriamente separados.

### 21. Sem owner
Doc aprovado com "a área" como dona.
**Como evitar:** owner é pessoa (papel formal), não área amorfa.

### 22. "Depois a gente mede"
KPIs sem cadência definida.
**Como evitar:** cadência semanal/mensal/trimestral explícita com dono do report.
