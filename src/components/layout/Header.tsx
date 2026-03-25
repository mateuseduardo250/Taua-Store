'use client';

import Link from 'next/link';
import Image from 'next/image';
import { storeConfig } from '@/config.store';

export function Header() {
  return (
    <header className="page-section">
      <div className="container card" style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ marginBottom: 14 }}>
              <Image
                src="/TSstore.png"
                alt="Tauá Store"
                width={220}
                height={120}
                style={{ width: '220px', height: 'auto', borderRadius: 12 }}
                priority
              />
            </div>

            <span className="badge">🛍️ {storeConfig.storeName}</span>

            <h1 className="title" style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginTop: 12 }}>
              Loja oficial para pedidos rápidos no hotel ou em qualquer lugar
            </h1>

            <p className="subtitle">
              O cliente entra na {storeConfig.storeName}, escolhe os itens, define a quantidade,
              adiciona ao carrinho e finaliza a compra com entrega em casa ou no quarto do hotel.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
              <Link className="btn btn-secondary" href="#produtos">
                Categorias
              </Link>

              <Link className="btn btn-primary" href="/checkout">
                Ir para pagamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
