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
    <aside className="card" style={{ padding: 20, position: 'static', top: 'auto', width: '100%', maxWidth: '100%', alignSelf: 'start' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h3 style={{ margin: 0 }}>🛒 Carrinho</h3>
        <span className="badge">{itemsCount} item(ns)</span>
      </div>

      <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
        {selected.length === 0 && <p className="helper">Nenhum item adicionado ainda.</p>}

        {selected.map((product) => (
          <div
            key={product.id}
            className="card"
            style={{
              padding: 14,
              background: 'rgba(255,255,255,0.12)',
              boxShadow: 'none',
              border: '1px solid rgba(255,255,255,0.16)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>{product.name}</strong>
                <div
  style={{
    marginTop: 6,
    color: '#374151',
    fontSize: 16,
    fontWeight: 700,
    opacity: 1,
  }}
>
  {quantities[product.id]}x • {formatBRL(product.price * quantities[product.id])}
</div>
              </div>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('cart:decrease', { detail: product.id }))}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.10)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 20,
                  lineHeight: '1',
                }}
                title="Reduzir item"
              >
                −
              </button>
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
