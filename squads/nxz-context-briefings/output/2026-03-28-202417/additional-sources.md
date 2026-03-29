# Fontes Adicionais de Contexto

## Fontes Fornecidas

### Fonte 1 — Codebase NXZ Go
- **Tipo:** arquivo_local (repositorio)
- **Referencia:** /home/walterfrey/Documentos/code/nexuz/nxz_go_play_store
- **Foco:** Stack tecnica, funcionalidades, modos, integracoes de pagamento, arquitetura multi-projeto
- **Conteudo extraido:**
  - App: React Native 0.81.1, TypeScript, Android-only
  - Nome interno: "Moober Self Checkout" (NxzGo)
  - Versao: 5.13.1
  - Modos: PDV (Caixa), KDS (Cozinha), Totem (Autoatendimento), Smart POS
  - Builds por adquirente: playstore, stone, cielo, pagbank, sample
  - Pagamentos: PagBank, Stone, Cielo, Pagarme, Sumup, PIX
  - Impressoras: ESC/POS, Bluetooth, Rede, USB
  - Database: Firebase + Supabase
  - Realtime: WebSocket (Odoo Bus)
  - Fiscal: CFe/SAT, NFC-e
  - Offline: funciona sem internet, sincroniza quando reconecta
  - Multi-tenant: multiplas lojas, configuracoes por loja
  - Monitoramento: Sentry
  - Testes: Jest (unit) + Maestro (E2E)

## Instrucoes de Priorizacao

- Focar em funcionalidades e beneficios para marketing, nao em detalhes de codigo
- Usar a arquitetura multi-projeto (builds por adquirente) como diferencial
- Destacar o modo offline como diferencial competitivo
- Usar as integracoes de pagamento como argumento de vendas
