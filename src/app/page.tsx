import { Header } from '@/components/layout/Header';
import { ProductList } from '@/components/products/ProductList';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
<div
  style={{
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    background: 'linear-gradient(90deg, #065f46, #10b981)',
    borderRadius: 12,
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 10px 24px rgba(16, 185, 129, 0.22)',
  }}
>
  Categorias
</div>
      <ProductList />
      <Footer />
    </main>
  );
}
