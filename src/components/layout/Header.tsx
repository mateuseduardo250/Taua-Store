'use client';

import Link from 'next/link';
import { storeConfig } from '@/config.store';

export function Header() {
  return (
    <header className="page-section">
      <div className="container card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <span className="badge">🛍️ {storeConfig.storeName}</span>
            <h1 className="title" style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginTop: 12 }}>
              Loja oficial para pedidos rápidos no hotel ou em qualquer lugar
            </h1>
            <p className="subtitle">
              O cliente escaneia o QR Code, entra na {storeConfig.storeName}, escolhe os itens, define a quantidade,
              adiciona ao carrinho e finaliza a compra com entrega em casa ou no quarto do hotel.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn btn-secondary" href="#produtos">
              Ver produtos
            </Link>
            <Link className="btn btn-primary" href="/checkout">
              Ir para pagamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
