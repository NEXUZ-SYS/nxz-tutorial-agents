---
type: checkpoint
outputFile: squads/nxz-erpnext-setup/pipeline/data/config-focus.md
---

# Step 01: Configuração Inicial

## Contexto
Com o escopo selecionado (step 00), precisamos alinhar parâmetros técnicos
de acesso antes de entrevistar e projetar.

## Perguntas

### Qual a porta HTTP da stack local? (HTTP_PUBLISH_PORT do `frappe_docker/nxz/.env`)
O default documentado é 8080. Máquinas diferentes podem usar outras.

1. 8080 (default)
2. 8090 (usada pelo autor das docs nxz)
3. Outra porta — vou informar

### Onde está o repo `frappe_docker` neste ambiente?
Este caminho é necessário para invocar scripts `nxz/*.sh` e docs.

1. `/home/walterfrey/Documentos/code/frappe_docker` (default desta máquina)
2. Outro caminho — vou informar

### Usuário alvo da API Key (quem vai rodar a squad)
Boa prática: criar usuário dedicado AI Team em vez de usar Administrator em produção.
Para primeira execução local, Administrator é aceitável.

1. Administrator (quick start — primeira run)
2. email@nxz.ai — criar usuário dedicado AI Team (recomendado para runs futuras)
3. Outro usuário — vou informar (email do User já existente)

### Nível de customização desejado (dentro do escopo escolhido)
Define quão agressivamente o Architect pode propor Custom Fields / Server Scripts / Workflows.

1. Conservador — apenas o mínimo declarado na entrevista (deltas exigem aprovação explícita)
2. Moderado — Architect pode propor até 3 deltas por layer com justificativa
3. Liberal — Architect pode propor livremente, todas as propostas vão ao Step 07 para revisão
