import { Header } from '@/components/layout/Header';
import { ProductList } from '@/components/products/ProductList';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <div style={{
  marginTop: 12,
  marginBottom: 12,
  padding: 12,
  background: '#d1fae5',
  borderRadius: 12,
  fontWeight: 600,
  textAlign: 'center',
  color: '#065f46'
}}>
  Categorias
</div>
      <ProductList />
      <Footer />
    </main>
  );
}
