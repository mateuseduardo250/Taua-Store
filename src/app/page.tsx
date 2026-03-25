import { Header } from '@/components/layout/Header';
import { QrSection } from '@/components/layout/QrSection';
import { ProductList } from '@/components/products/ProductList';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <QrSection />
      <ProductList />
      <Footer />
    </main>
  );
}
