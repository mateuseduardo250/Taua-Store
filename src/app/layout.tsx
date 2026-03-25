import './globals.css';
import type { Metadata } from 'next';
import { storeConfig } from '@/config.store';

export const metadata: Metadata = {
  title: storeConfig.storeName,
  description: 'Loja online do hotel com QR Code, carrinho, checkout e entrega em casa ou no quarto.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
