'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { getCart, saveCart } from '@/lib/storage';
import { validateCheckout } from '@/lib/validation';
import { CheckoutForm as CheckoutFormType, PaymentMethod } from '@/types/store';
import { formatBRL } from '@/lib/currency';
import { storeConfig } from '@/config.store';

const initialForm: CheckoutFormType = {
  customer: {
    fullName: '',
    cpf: '',
    phone: ''
  },
  paymentMethod: 'pix',
  card: {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    installments: 1
  },
  deliveryMethod: 'home',
  homeDelivery: {
    receiverName: '',
    state: '',
    zipCode: '',
    streetType: 'Rua',
    streetName: '',
    houseNumber: '',
    reference: '',
    complement: '',
    apartmentBlock: '',
    phone: ''
  },
  hotelDelivery: {
    guestFullName: '',
    guestCpf: '',
    guestPhone: '',
    roomNumber: ''
  }
};

export function CheckoutForm() {
  const router = useRouter();
  const [form, setForm] = useState<CheckoutFormType>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const cart = getCart();
  const selectedProducts = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<(typeof products)[number] & { quantity: number }>,
    [cart]
  );

  const total = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateField(path: string, value: string | number) {
    setForm((current) => {
      const next = structuredClone(current);
      const keys = path.split('.');
      let cursor: Record<string, unknown> = next as unknown as Record<string, unknown>;

      for (let index = 0; index < keys.length - 1; index += 1) {
        cursor = cursor[keys[index]] as Record<string, unknown>;
      }

      cursor[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function choosePayment(method: PaymentMethod) {
    setForm((current) => ({
      ...current,
      paymentMethod: method,
      card: {
        ...current.card,
        installments: method === 'credit' ? current.card.installments : 1
      }
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateCheckout(form, selectedProducts);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    const orderPayload = {
      form,
      items: selectedProducts,
      total,
      paymentStatus: form.paymentMethod === 'pix' ? 'aguardando pagamento PIX' : 'autorização simulada'
    };

    window.sessionStorage.setItem('taua-store-last-order', JSON.stringify(orderPayload));
    saveCart([]);
    router.push('/success');
  }

  return (
    <form onSubmit={handleSubmit} className="grid">
      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>1. Dados do cliente</h2>
        <div className="field-group" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="field">
            <label>Nome completo</label>
            <input value={form.customer.fullName} onChange={(e) => updateField('customer.fullName', e.target.value)} />
            {errors.customerName && <span className="error">{errors.customerName}</span>}
          </div>
          <div className="field">
            <label>CPF</label>
            <input value={form.customer.cpf} onChange={(e) => updateField('customer.cpf', e.target.value)} placeholder="000.000.000-00" />
            {errors.customerCpf && <span className="error">{errors.customerCpf}</span>}
          </div>
          <div className="field">
            <label>Celular</label>
            <input value={form.customer.phone} onChange={(e) => updateField('customer.phone', e.target.value)} placeholder="(00) 00000-0000" />
            {errors.customerPhone && <span className="error">{errors.customerPhone}</span>}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>2. Pagamento</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <button type="button" className={`btn ${form.paymentMethod === 'pix' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => choosePayment('pix')}>
            PIX
          </button>
          <button type="button" className={`btn ${form.paymentMethod === 'credit' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => choosePayment('credit')}>
            Crédito
          </button>
          <button type="button" className={`btn ${form.paymentMethod === 'debit' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => choosePayment('debit')}>
            Débito
          </button>
        </div>

        {form.paymentMethod === 'pix' ? (
          <div className="success-box">
            {storeConfig.pixStatusMessage}
          </div>
        ) : (
          <div className="field-group" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="field">
              <label>Nome no cartão</label>
              <input value={form.card.cardName} onChange={(e) => updateField('card.cardName', e.target.value)} />
              {errors.cardName && <span className="error">{errors.cardName}</span>}
            </div>
            <div className="field">
              <label>Número do cartão</label>
              <input value={form.card.cardNumber} onChange={(e) => updateField('card.cardNumber', e.target.value)} placeholder="0000 0000 0000 0000" />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>
            <div className="field">
              <label>Validade</label>
              <input value={form.card.expiry} onChange={(e) => updateField('card.expiry', e.target.value)} placeholder="MM/AA" />
              {errors.cardExpiry && <span className="error">{errors.cardExpiry}</span>}
            </div>
            <div className="field">
              <label>CVV</label>
              <input value={form.card.cvv} onChange={(e) => updateField('card.cvv', e.target.value)} placeholder="123" />
              {errors.cardCvv && <span className="error">{errors.cardCvv}</span>}
            </div>
            <div className="field">
              <label>Parcelas</label>
              <select value={form.card.installments} onChange={(e) => updateField('card.installments', Number(e.target.value))}>
                {Array.from({ length: form.paymentMethod === 'credit' ? 12 : 1 }, (_, i) => i + 1).map((installment) => (
                  <option key={installment} value={installment}>
                    {installment}x de {formatBRL(total / installment || 0)}
                  </option>
                ))}
              </select>
              {errors.cardInstallments && <span className="error">{errors.cardInstallments}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>3. Entrega</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <button type="button" className={`btn ${form.deliveryMethod === 'home' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateField('deliveryMethod', 'home')}>
            Entrega em casa
          </button>
          <button type="button" className={`btn ${form.deliveryMethod === 'hotel' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateField('deliveryMethod', 'hotel')}>
            Receber no quarto do hotel
          </button>
        </div>

        {form.deliveryMethod === 'home' ? (
          <div className="field-group" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="field">
              <label>Nome da pessoa que vai receber</label>
              <input value={form.homeDelivery.receiverName} onChange={(e) => updateField('homeDelivery.receiverName', e.target.value)} />
              {errors.receiverName && <span className="error">{errors.receiverName}</span>}
            </div>
            <div className="field">
  <label>Endereço</label>
  <input type="text" placeholder="Digite o endereço completo" />
</div>
            <div className="field">
              <label>Estado</label>
              <input value={form.homeDelivery.state} onChange={(e) => updateField('homeDelivery.state', e.target.value)} />
              {errors.homeState && <span className="error">{errors.homeState}</span>}
            </div>
            <div className="field">
              <label>CEP</label>
              <input value={form.homeDelivery.zipCode} onChange={(e) => updateField('homeDelivery.zipCode', e.target.value)} placeholder="00000-000" />
              {errors.homeZip && <span className="error">{errors.homeZip}</span>}
            </div>
            <div className="field">
              <label>Rua / Avenida</label>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10 }}>
                <select value={form.homeDelivery.streetType} onChange={(e) => updateField('homeDelivery.streetType', e.target.value)}>
                  <option>Rua</option>
                  <option>Avenida</option>
                  <option>Alameda</option>
                  <option>Travessa</option>
                  <option>Outro</option>
                </select>
                <input value={form.homeDelivery.streetName} onChange={(e) => updateField('homeDelivery.streetName', e.target.value)} />
              </div>
              {errors.homeStreet && <span className="error">{errors.homeStreet}</span>}
            </div>
            <div className="field">
              <label>Número da casa</label>
              <input value={form.homeDelivery.houseNumber} onChange={(e) => updateField('homeDelivery.houseNumber', e.target.value)} />
              {errors.homeNumber && <span className="error">{errors.homeNumber}</span>}
            </div>
            <div className="field">
              <label>Referência</label>
              <input value={form.homeDelivery.reference} onChange={(e) => updateField('homeDelivery.reference', e.target.value)} />
            </div>
            <div className="field">
              <label>Complemento</label>
              <input value={form.homeDelivery.complement} onChange={(e) => updateField('homeDelivery.complement', e.target.value)} placeholder="Casa, apartamento, sala..." />
            </div>
            <div className="field">
              <label>Bloco / andar (se apartamento)</label>
              <input value={form.homeDelivery.apartmentBlock} onChange={(e) => updateField('homeDelivery.apartmentBlock', e.target.value)} placeholder="Ex.: Bloco 4D, 2º andar" />
            </div>
            <div className="field">
              <label>Telefone para entrega</label>
              <input value={form.homeDelivery.phone} onChange={(e) => updateField('homeDelivery.phone', e.target.value)} />
              {errors.homePhone && <span className="error">{errors.homePhone}</span>}
            </div>
          </div>
        ) : (
          <div className="field-group" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <div className="field">
              <label>Nome completo</label>
              <input value={form.hotelDelivery.guestFullName} onChange={(e) => updateField('hotelDelivery.guestFullName', e.target.value)} />
              {errors.hotelName && <span className="error">{errors.hotelName}</span>}
            </div>
            <div className="field">
              <label>CPF</label>
              <input value={form.hotelDelivery.guestCpf} onChange={(e) => updateField('hotelDelivery.guestCpf', e.target.value)} />
              {errors.hotelCpf && <span className="error">{errors.hotelCpf}</span>}
            </div>
            <div className="field">
              <label>Celular</label>
              <input value={form.hotelDelivery.guestPhone} onChange={(e) => updateField('hotelDelivery.guestPhone', e.target.value)} />
              {errors.hotelPhone && <span className="error">{errors.hotelPhone}</span>}
            </div>
            <div className="field">
              <label>Número do quarto</label>
              <input value={form.hotelDelivery.roomNumber} onChange={(e) => updateField('hotelDelivery.roomNumber', e.target.value)} placeholder="4 dígitos" maxLength={4} />
              {errors.hotelRoom && <span className="error">{errors.hotelRoom}</span>}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>Total do pedido</h3>
            <p className="subtitle" style={{ marginTop: 8 }}>Pagamento {form.paymentMethod === 'credit' ? `em ${form.card.installments}x` : 'à vista'}</p>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{formatBRL(total)}</div>
        </div>
        {errors.cart && <div className="error" style={{ marginTop: 12 }}>{errors.cart}</div>}
        <button className="btn btn-primary" type="submit" style={{ marginTop: 18, width: '100%' }} disabled={processing}>
          {processing ? 'Processando pedido...' : 'Finalizar pedido'}
        </button>
        <p className="helper" style={{ marginTop: 12 }}>
          Esta base deixa o fluxo pronto. Para receber o dinheiro direto na sua conta, conecte um gateway de pagamento no backend.
        </p>
      </div>
    </form>
  );
}
