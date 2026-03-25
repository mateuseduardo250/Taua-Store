'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatBRL } from '@/lib/currency';
import { storeConfig } from '@/config.store';

type OrderData = {
  total: number;
  paymentStatus: string;
  form: {
    paymentMethod: 'pix' | 'credit' | 'debit';
    deliveryMethod: 'home' | 'hotel';
  };
};

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem('taua-store-last-order');
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  return (
    <main className="page-section">
      <div className="container card" style={{ padding: 28, maxWidth: 760 }}>
        <span className="badge">✅ Pedido enviado</span>
        <h1 style={{ fontSize: 36, marginBottom: 10 }}>Pedido registrado na {storeConfig.storeName}</h1>
        <p className="subtitle">
          Esta versão base já deixa a jornada pronta para você continuar personalizando com PIX, suporte, estorno e identidade visual.
        </p>

        {order && (
          <div className="grid" style={{ marginTop: 24 }}>
            <div className="success-box">
              <strong>Status:</strong> {order.paymentStatus}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><strong>Total:</strong> {formatBRL(order.total)}</div>
                <div><strong>Pagamento:</strong> {order.form.paymentMethod}</div>
                <div><strong>Entrega:</strong> {order.form.deliveryMethod === 'hotel' ? 'No quarto do hotel' : 'No endereço informado'}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Voltar para a loja</Link>
          <Link href="/checkout" className="btn btn-secondary">Novo pedido</Link>
        </div>
      </div>
    </main>
  );
}
