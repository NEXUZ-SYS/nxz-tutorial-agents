# Fontes Adicionais de Contexto

## Fontes Fornecidas

### Fonte 1 — Codebase NXZ Go
- **Tipo:** arquivo_local (repositorio)
- **Referencia:** /home/walterfrey/Documentos/code/nexuz/nxz_go_play_store
- **Foco:** Stack tecnica, funcionalidades do modo PDV/Caixa, integracoes de pagamento, arquitetura
- **Conteudo extraido:**
  - App: React Native 0.81.1, TypeScript, Android-only
  - Nome interno: "Moober Self Checkout" (NxzGo)
  - Versao: 5.13.1
  - Modos: PDV (Caixa), KDS (Cozinha), Totem (Autoatendimento), Smart POS
  - Builds por adquirente: playstore, stone, cielo, pagbank, sample
  - Pagamentos: PagBank, Stone, Cielo, Pagarme, Sumup, PIX
  - Impressoras: ESC/POS, Bluetooth, Rede, USB
  - Database: Firebase + Supabase
  - Fiscal: CFe/SAT, NFC-e
  - Offline: funciona sem internet, sincroniza quando reconecta

### Fonte 2 — Docs de Contexto NXZ Go
- **Tipo:** arquivo_local (documentacao)
- **Referencia:** context/(V_0.1) NXZ GO.md, context/NXZ Go - Funcionalidades.md, context/(V_0.1) NXZ Go - Arquitetura.md, context/comparativo.md, context/fluxos.md
- **Foco:** Funcionalidades do modo PDV, fluxos operacionais, comparativo de modos

## Instrucoes de Priorizacao

- Focar em funcionalidades especificas do modo PDV (Caixa)
- Diferenciar claramente o PDV do Totem (briefing ja feito)
- Destacar: controle de caixa, modo restaurante com mesas, descontos, emissao fiscal, multiplas formas de pagamento
- Usar mesma estrutura e profundidade do briefing do Totem aprovado
