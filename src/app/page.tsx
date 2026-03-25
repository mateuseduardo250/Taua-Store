import { Header } from '@/components/layout/Header';
import { ProductList } from '@/components/products/ProductList';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <ProductList />
      <Footer />
    </main>
  );
}
