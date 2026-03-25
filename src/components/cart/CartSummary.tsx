'use client';

import Link from 'next/link';
import { Product } from '@/types/store';
import { formatBRL } from '@/lib/currency';

type Props = {
  products: Product[];
  quantities: Record<string, number>;
};

export function CartSummary({ products, quantities }: Props) {
  const selected = products.filter((product) => quantities[product.id] > 0);
  const itemsCount = selected.reduce((acc, product) => acc + quantities[product.id], 0);
  const total = selected.reduce((acc, product) => acc + product.price * quantities[product.id], 0);

  return (
    <aside className="card" style={{ padding: 20, position: 'sticky', top: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h3 style={{ margin: 0 }}>🛒 Carrinho</h3>
        <span className="badge">{itemsCount} item(ns)</span>
      </div>

      <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        {selected.length === 0 && <p className="helper">Nenhum item adicionado ainda.</p>}
        {selected.map((product) => (
          <div key={product.id} className="card" style={{ padding: 14, background: '#fbfdff', boxShadow: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <strong>{product.name}</strong>
              <span>{quantities[product.id]}x</span>
            </div>
            <div className="helper" style={{ marginTop: 8 }}>
              {formatBRL(product.price * quantities[product.id])}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontWeight: 700 }}>
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </div>
        <Link href="/checkout" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
          Finalizar compra
        </Link>
      </div>
    </aside>
  );
}
