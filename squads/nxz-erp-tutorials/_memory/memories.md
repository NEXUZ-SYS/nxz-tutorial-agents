# NXZ ERP Tutorials — Squad Memory

## Configuracao

- Odoo URL (SaaS): definido em .env (ODOO_SAAS_URL, ODOO_SAAS_USER, ODOO_SAAS_PASSWORD)
- Odoo URL (Local): definido em .env (ODOO_LOCAL_URL, ODOO_LOCAL_USER, ODOO_LOCAL_PASSWORD)
- Codebase: ~/Documentos/code/nexuz/odoo_12
- Framework: Odoo 12
- Output: Markdown com imagens PNG

## Preferencias

- Nunca usar identificadores tecnicos do Odoo (XML IDs, nomes de models) em tutoriais
- Sempre usar os nomes exibidos na interface do usuario
- Banner de aviso de certificado pode ser simulado via Playwright para screenshots
- Modulos customizados Nexuz ficam em addons/nexuz/ (98 modulos)
- O wizard de certificado fica em nxz_br_nfe (menu Faturamento > Configuracao > Atualizar Certificado Digital)
- Salvar tutoriais finais no Notion (pagina pai: "Testes tutoriais com IA")

## Historico de Execucoes

### Run 2026-03-20-224946
- **Topico:** Atualizar Certificado Digital para NF-e/NFC-e
- **Persona:** Gerente de Operacao
- **Nivel:** Basico
- **Resultado:** Aprovado
- **Screenshots:** 9 capturadas (1 simulada - banner de aviso)
- **Notas:** O wizard de certificado abre como modal (act_window target=new). Navegacao direta por URL hash nao funciona; precisa usar do_action via JS.

### Run 2026-03-23-094138
- **Topico:** Como Abrir e Fechar uma Sessao do Ponto de Venda
- **Persona:** Operador de Caixa
- **Nivel:** Basico
- **Resultado:** Aprovado e salvo no Notion
- **Screenshots:** 5 capturadas de 9 planejadas (4 falharam por limitacoes do ambiente de producao - nenhuma sessao em estado Controle de Abertura e todos os PDVs com sessoes ativas)
- **Notas:** Ambiente SaaS de producao limita capturas de screenshots para estados que nao estao ativos no momento. Screenshots reutilizadas para contextos similares (abertura/fechamento). Tutorial salvo no Notion em "Testes tutoriais com IA".
