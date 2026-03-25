'use client';

import { QRCodeSVG } from 'qrcode.react';
import { storeConfig } from '@/config.store';

export function QrSection() {
  const storeUrl = storeConfig.publicUrl;

  return (
    <section className="page-section">
      <div className="container card" style={{ padding: 24, display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'center' }}>
        <div>
          <span className="badge">📱 QR Code da loja</span>
          <h2 style={{ margin: '14px 0 10px', fontSize: 28 }}>Escaneou, abriu a {storeConfig.storeName}</h2>
          <p className="subtitle">
            Este QR Code deve apontar para a URL pública da sua loja. Depois que você publicar no Vercel,
            troque a URL abaixo pela URL real do seu projeto para funcionar em qualquer rede e também nos dados móveis.
          </p>
          <div className="card" style={{ padding: 16, marginTop: 16, background: '#f8fafc' }}>
            <strong>URL pública da loja:</strong>
            <div style={{ marginTop: 8, wordBreak: 'break-all' }}>{storeUrl}</div>
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div className="card" style={{ padding: 20 }}>
            <QRCodeSVG value={storeUrl} size={220} />
          </div>
        </div>
      </div>
    </section>
  );
}
