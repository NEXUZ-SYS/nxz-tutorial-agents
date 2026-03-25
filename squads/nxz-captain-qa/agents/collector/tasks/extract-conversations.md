---
name: Extrair Conversas
order: 1
input: Configuracao de teste (time, periodo, volume)
output: Lista de IDs de conversas com metadados basicos
---

## Process

1. Ler credenciais do .env
2. Listar times via API e mapear nomes para IDs
3. Para cada time selecionado, construir payload de filtro
4. Executar POST /conversations/filter com paginacao
5. Coletar IDs, status, datas e metadados basicos
6. Limitar ao volume definido na configuracao

## Output Format

Lista JSON de conversation IDs com metadados.

## Quality Criteria

- Todas as conversas sao do time correto
- Todas as conversas estao no periodo correto
- Volume respeitado (+-10% tolerancia)

## Veto Conditions

- Menos de 5 conversas encontradas
- Erro de autenticacao
