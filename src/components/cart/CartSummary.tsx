'use client';

import Link from 'next/link';
import { Product } from '@/types/store';
import { formatBRL } from '@/lib/currency';

type Props = {
  products: Product[];
  quantities: Record<string, number>;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function CartSummary({
  products,
  quantities,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const selected = products.filter((product) => quantities[product.id] > 0);
  const itemsCount = selected.reduce((acc, product) => acc + quantities[product.id], 0);
  const total = selected.reduce((acc, product) => acc + product.price * quantities[product.id], 0);

  return (
    <aside
      className="card"
      style={{
        padding: 20,
        position: 'static',
        width: '100%',
        maxWidth: '100%',
        alignSelf: 'start',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <h3 style={{ margin: 0 }}>🛒 Carrinho</h3>
        <span className="badge">{itemsCount} item(ns)</span>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {selected.length === 0 && <p className="helper">Nenhum item adicionado ainda.</p>}

        {selected.map((product) => (
          <div
            key={product.id}
            className="cart-item"
            style={{
              padding: 14,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: '#ffffff', fontSize: 16 }}>
                  {product.name}
                </strong>

                <div
                  style={{
                    color: '#cbd5e1',
                    marginTop: 6,
                    fontSize: 14,
                  }}
                >
                  {formatBRL(product.price)} cada
                </div>

                <div
                  style={{
                    color: '#ffffff',
                    marginTop: 8,
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {formatBRL(product.price * quantities[product.id])}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(product.id)}
                style={{
                  border: '1px solid rgba(248,113,113,0.35)',
                  background: 'rgba(248,113,113,0.14)',
                  color: '#fecaca',
                  borderRadius: 12,
                  width: 34,
                  height: 34,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
                aria-label={`Remover ${product.name}`}
                title="Remover item"
              >
                ×
              </button>
            </div>

            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 14,
                  padding: '6px 10px',
                }}
              >
                <button
                  type="button"
                  onClick={() => onDecrease(product.id)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  −
                </button>

                <span style={{ minWidth: 24, textAlign: 'center', color: '#ffffff', fontWeight: 700 }}>
                  {quantities[product.id]}
                </span>

                <button
                  type="button"
                  onClick={() => onIncrease(product.id)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: '1px solid rgba(16,185,129,0.25)',
                    background: 'rgba(16,185,129,0.18)',
                    color: '#bbf7d0',
                    cursor: 'pointer',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  +
                </button>
              </div>

              <span style={{ color: '#cbd5e1', fontSize: 14 }}>Ajuste a quantidade</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </div>

        <Link
          href="/checkout"
          className="btn btn-primary"
          style={{ display: 'block', textAlign: 'center', marginTop: 16 }}
        >
          Finalizar compra
        </Link>
      </div>
    </aside>
  );
}
