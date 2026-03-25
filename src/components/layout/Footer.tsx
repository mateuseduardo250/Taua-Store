import { storeConfig } from '@/config.store';

export function Footer() {
  return (
    <footer className="page-section">
      <div className="container card" style={{ padding: 20, textAlign: 'center' }}>
        <p className="helper" style={{ margin: 0 }}>
          Personalização rápida: produtos em <strong>{storeConfig.productsFilePath}</strong>.
        </p>
        <p className="helper" style={{ margin: '8px 0 0' }}>
          Suporte: <strong>{storeConfig.supportPhone}</strong> — {storeConfig.supportMessage}.
        </p>
      </div>
    </footer>
  );
}
