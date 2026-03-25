'use client';

import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { storeConfig } from '@/config.store';

export default function CheckoutPage() {
  return (
    <main className="page-section">
      <div className="container" style={{ display: 'grid', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <span className="badge">💳 Checkout</span>
            <h1 style={{ margin: '12px 0 0', fontSize: 34 }}>Finalização da compra - {storeConfig.storeName}</h1>
          </div>
          <Link className="btn btn-secondary" href="/">
            Voltar para a loja
          </Link>
        </div>

        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 360px' }}>
          <CheckoutForm />
          <div>
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
