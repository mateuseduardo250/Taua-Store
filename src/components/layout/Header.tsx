'use client';

import Link from 'next/link';
import Image from 'next/image';
import { storeConfig } from '@/config.store';

export function Header() {
  return (
    <header className="page-section">
      <div className="container card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* IMAGEM TOPO */}
          <Image
            src="/TSstore.png"
            alt="Tauá Store"
            width={400}
            height={200}
            style={{
              width: '100%',
              maxHeight: 180,
              objectFit: 'cover',
              borderRadius: 16
            }}
            priority
          />

          <span className="badge">🛍️ {storeConfig.storeName}</span>

          <h1 className="title" style={{ fontSize: 'clamp(24px, 4vw, 34px)' }}>
            Loja oficial para pedidos rápidos no hotel ou em qualquer lugar
          </h1>

          <p className="subtitle">
            Escolha os itens, defina a quantidade e finalize a compra.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link className="btn btn-secondary" href="#produtos">
              Categorias
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
