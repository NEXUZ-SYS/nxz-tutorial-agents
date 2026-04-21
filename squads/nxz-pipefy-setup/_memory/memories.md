# Squad Memory — nxz-pipefy-setup

## Learnings (Run 2026-04-20-162723)

### Decisões arquiteturais consolidadas
- **Contas → Parceiros (CTI):** adotar CTI com `Parceiros` abstrata + especializações (`Clientes`, `Fornecedores`, `Colaboradores`). Nesta execução criamos Parceiros + Clientes; outras especializações em runs futuras.
- **Contato modelado como Parceiro PF:** não criar tabela `Contatos` separada. `Parceiros.tipo_pessoa=PF` + connector self-ref `empresa_mãe` cobre a relação N:1 Contato→Cliente.
- **Roles de Contato (Abordagem A):** 1 connector único `contatos_do_deal` no Start Form (multi) + role GLOBAL no Parceiro (`Papel no comitê`: Decisor/Influenciador/Operacional/Gatekeeper). Abordagem B (connector por role) foi descartada — user prefere simplicidade.
- **Enforcement 1:1 (DD-002):** pre-check client-side obrigatório + title formula visual + audit diário webhook. Sem webhook validator nuclear.
- **Creation livre:** usuários podem criar diretamente em Parceiros ou Clientes. Sem automação "creation-via-Parceiros" (economiza quota).
- **Escopo v1:** Pipe Vendas + Parceiros + Clientes. Nutrição, Implantação, Fornecedores, Colaboradores ficam para runs futuras.

### Padrões descobertos no Pipefy durante execução
- **Pipe cria 3 phases default automaticamente** (Caixa de entrada/Fazendo/Concluído) — sempre deletar após `createPipe`.
- **Start Form tem phase oculta** (`pipe.startFormPhaseId`), separada de "Novo Lead". Phase fields da primeira phase NÃO populam o start form.
- **ID collision phase_field vs table_field:** mesmo slug (`n_unidades`, `cliente`, etc.) em ambos causa "Acesso negado" em `updatePhaseField`. Solução: passar `id` + `uuid` juntos.
- **`deletePhaseField` bloqueia ~85% dos types** ("Acesso negado") — deletar pipe inteiro + recriar é o workaround.
- **Boolean = `radio_horizontal` com ["Sim","Não"]** — `checkbox` não existe como phase_field type.
- **`createPipe` não aceita `public`** — default é privado.

### O que funcionou bem
- Consultar pipes existentes ([Modelo] CRM) via GraphQL API deu padrões concretos.
- Scripts Python reutilizáveis para lotes de mutations (create_field helpers).
- `id + uuid` para desambiguar IDs em `updatePhaseField`.
- Iteração rápida: criar pipe → validar com user → descobrir erro de design → recriar (2 versões em 1 hora).

### O que evitar na próxima
- Não criar fields de intake como phase_field na primeira phase esperando virar start form.
- Não tentar deletar phase_field individualmente — recriar pipe é mais confiável.
- Discutir refinamentos CTI com user antes de executar (o user trouxe N:1 Contato↔Cliente + roles depois).

### IDs importantes (produção)
- Org: `302461450` (Nxz Sistemas Inteligentes Ltda)
- Tables: Parceiros=`xcO4_FB_`, Clientes=`XaduYW7H`
- Pipe Vendas: `307117441` (v2 limpa; v1 `307117352` deletada)
- Start Form phase: `342928165`

### Pendente na próxima run
- Layers 5-7: 6 Field Conditions + 16 Automations + 4 Email Templates
- Playbook Vendas Nexuz (Google Doc — URL do PLAYBOOK-VENDAS-NEXUZ a substituir quando publicado)
- Webhook receiver para audit diário de duplicatas (DD-002 camada 3)
- DPAs antes do go-live produtivo (PDD R-09)

### Aplicado com sucesso nesta run
- **Mini-guias** em 8 phase descriptions (1 linha resumo, sem link) + 8 statements (instruções curtas)
- **Links Playbook** em 55 phase_field.descriptions usando markdown `[Playbook — §X](url)`
- **Pipe.noun** = "oportunidade" (via API updatePipe)
- **Pipe.create_card_label** = "Nova oportunidade" (via Playwright — API é read-only)
- **Pipe.description** = setada via Playwright (aceitou no UI, API query retorna null — peculiaridade Pipefy)

### Reusable templates produzidos
- `/tmp/build-vendas-v2.py` — script completo de criação de fields
- `/tmp/update-help.py` + `/tmp/update-help3.py` — patterns de update em batch com id+uuid
- `/tmp/apply-links.py` — regex-based replacement de Playbook markers por markdown links
- **`skills/pipefy-integration/scripts/templates/customize-pipe-settings.js`** — template Playwright reutilizável para customização UI-only de pipes (button_text + description). Reusar em pipes futuros.

### Descoberta chave — Playwright CLI como extensão da API
Pipefy tem várias configurações UI-only que não existem em mutations GraphQL.
Padrão estabelecido: **API para o que der + Playwright CLI para o resto**, ambos via skill.
Template genérico cobre: login 2-step auto, navegação em drawer/modal, CKEditor em iframe.
