'use client';

import { Product } from '@/types/store';
import { formatBRL } from '@/lib/currency';

type Props = {
  product: Product;
  quantity: number;
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
};

export function ProductCard({ product, quantity, onIncrease, onDecrease }: Props) {
  const remaining = product.stock - quantity;

  return (
    <div className="card" style={{ padding: 18, display: 'grid', gap: 16, gridTemplateColumns: '92px 1fr auto', alignItems: 'center' }}>
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 20,
          display: 'grid',
          placeItems: 'center',
          fontSize: 40,
          background: '#ecfeff'
        }}
      >
        {product.image}
      </div>

      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0 }}>{product.name}</h3>
          <span className="badge">{product.category}</span>
        </div>
        <p className="subtitle" style={{ marginTop: 8 }}>{product.description}</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          <strong style={{ fontSize: 18 }}>{formatBRL(product.price)}</strong>
          <span className="helper">Estoque disponível: {remaining}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10, minWidth: 140 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: '1px solid var(--border)', borderRadius: 14, padding: 8 }}>
          <button className="btn btn-secondary" style={{ padding: '10px 12px' }} onClick={() => onDecrease(product.id)}>
            -
          </button>
          <strong>{quantity}</strong>
          <button className="btn btn-primary" style={{ padding: '10px 12px' }} onClick={() => onIncrease(product.id)} disabled={remaining <= 0}>
            +
          </button>
        </div>
        <div className="helper" style={{ textAlign: 'center' }}>Selecione a quantidade</div>
      </div>
    </div>
  );
}
