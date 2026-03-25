# Tauá Store

Base de loja online em Next.js para uso em hotel, com:

- QR Code da loja
- lista de produtos com estoque
- carrinho
- checkout com PIX, crédito e débito
- entrega em casa ou no quarto do hotel
- estrutura organizada por pastas

## Onde editar

- Nome da loja e URL pública: `src/config.store.ts`
- Produtos: `src/data/products.ts`
- Layout e visual: `src/components/layout/` e `src/app/globals.css`
- Checkout: `src/components/checkout/`

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar na internet

Publique no Vercel e depois atualize `publicUrl` em `src/config.store.ts` com a URL real do projeto.

## Observação importante

A parte visual do checkout está pronta, mas pagamentos reais com PIX e cartão exigem integração segura com backend/gateway.
