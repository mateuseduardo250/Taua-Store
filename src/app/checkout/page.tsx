'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { storeConfig } from '@/config.store';

export default function CheckoutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <main className="page-section">
      <div className="container" style={{ display: 'grid', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="badge">💳 Checkout</span>
            <h1 style={{ margin: '12px 0 0', fontSize: isMobile ? 26 : 34 }}>
              Finalização da compra - {storeConfig.storeName}
            </h1>
          </div>

          <Link className="btn btn-secondary" href="/">
            Voltar para a loja
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 360px',
            alignItems: 'start',
          }}
        >
          <div>
            <CheckoutForm />
          </div>

          <div style={{ marginTop: isMobile ? 0 : 0 }}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
