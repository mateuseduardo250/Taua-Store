import { Header } from '@/components/layout/Header';
import { ProductList } from '@/components/products/ProductList';
import { CartSummary } from '@/components/cart/CartSummary';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />

      {/* PRODUTOS */}
      <ProductList />

      {/* CARRINHO EMBAIXO */}
      <div style={{ marginTop: 24 }}>
        <CartSummary />
      </div>

      <Footer />
    </main>
  );
}
