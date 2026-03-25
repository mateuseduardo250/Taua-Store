'use client';

import { products } from '@/data/products';
import { formatBRL } from '@/lib/currency';
import { getCart } from '@/lib/storage';

export function OrderSummary() {
  const cart = getCart();
  const selected = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as Array<(typeof products)[number] & { quantity: number }>;

  const total = selected.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Resumo do pedido</h3>
      <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
        {selected.length === 0 && <p className="helper">Seu carrinho está vazio.</p>}
        {selected.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <strong>{item.name}</strong>
              <div className="helper">{item.quantity} unidade(s)</div>
            </div>
            <strong>{formatBRL(item.price * item.quantity)}</strong>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <strong>Total</strong>
        <strong>{formatBRL(total)}</strong>
      </div>
    </div>
  );
}
