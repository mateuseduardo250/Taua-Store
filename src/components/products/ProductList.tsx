'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { CartSummary } from '@/components/cart/CartSummary';
import { products } from '@/data/products';
import { getCart, saveCart } from '@/lib/storage';

export function ProductList() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const cart = getCart();
    const nextState = cart.reduce<Record<string, number>>((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {});
    setQuantities(nextState);
  }, []);

  useEffect(() => {
    const cartItems = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));

    saveCart(cartItems);
  }, [quantities]);

  const mapStock = useMemo(
    () => products.reduce<Record<string, number>>((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {}),
    []
  );

  function updateQuantity(productId: string, amount: number) {
    setQuantities((current) => {
      const currentQty = current[productId] ?? 0;
      const nextQty = Math.max(0, Math.min((mapStock[productId] ?? 0), currentQty + amount));
      return { ...current, [productId]: nextQty };
    });
  }

  return (
    <section id="produtos" className="page-section">
      <div className="container" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 1fr) 340px' }}>
        <div className="grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] ?? 0}
              onIncrease={() => updateQuantity(product.id, 1)}
              onDecrease={() => updateQuantity(product.id, -1)}
            />
          ))}
        </div>
        <CartSummary products={products} quantities={quantities} />
      </div>
    </section>
  );
}
