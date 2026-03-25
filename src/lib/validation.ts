import { CheckoutForm, Product } from '@/types/store';

export type FieldErrors = Record<string, string>;

const onlyDigits = (value: string) => value.replace(/\D/g, '');

export function validateCheckout(form: CheckoutForm, products: Product[]): FieldErrors {
  const errors: FieldErrors = {};
  const cpf = onlyDigits(form.customer.cpf);
  const phone = onlyDigits(form.customer.phone);

  if (!form.customer.fullName.trim()) errors.customerName = 'Informe o nome completo.';
  if (cpf.length !== 11) errors.customerCpf = 'CPF precisa ter 11 dígitos.';
  if (phone.length < 10) errors.customerPhone = 'Telefone inválido.';

  if (form.paymentMethod === 'credit' || form.paymentMethod === 'debit') {
    const cardDigits = onlyDigits(form.card.cardNumber);
    if (!form.card.cardName.trim()) errors.cardName = 'Informe o nome impresso no cartão.';
    if (cardDigits.length < 13 || cardDigits.length > 19) errors.cardNumber = 'Número do cartão inválido.';
    if (!/^\d{2}\/\d{2}$/.test(form.card.expiry)) errors.cardExpiry = 'Validade deve estar em MM/AA.';
    if (!/^\d{3,4}$/.test(onlyDigits(form.card.cvv))) errors.cardCvv = 'CVV inválido.';
    if (form.paymentMethod === 'debit' && form.card.installments !== 1) {
      errors.cardInstallments = 'Débito deve ser à vista.';
    }
  }

  if (form.deliveryMethod === 'home') {
    if (!form.homeDelivery.receiverName.trim()) errors.receiverName = 'Informe quem vai receber.';
    if (!form.homeDelivery.state.trim()) errors.homeState = 'Informe o estado.';
    if (onlyDigits(form.homeDelivery.zipCode).length !== 8) errors.homeZip = 'CEP precisa ter 8 dígitos.';
    if (!form.homeDelivery.streetName.trim()) errors.homeStreet = 'Informe a rua ou avenida.';
    if (!form.homeDelivery.houseNumber.trim()) errors.homeNumber = 'Informe o número.';
    if (onlyDigits(form.homeDelivery.phone).length < 10) errors.homePhone = 'Telefone de entrega inválido.';
  }

  if (form.deliveryMethod === 'hotel') {
    if (!form.hotelDelivery.guestFullName.trim()) errors.hotelName = 'Informe o nome completo.';
    if (onlyDigits(form.hotelDelivery.guestCpf).length !== 11) errors.hotelCpf = 'CPF do hóspede inválido.';
    if (onlyDigits(form.hotelDelivery.guestPhone).length < 10) errors.hotelPhone = 'Celular inválido.';
    if (!/^\d{4}$/.test(onlyDigits(form.hotelDelivery.roomNumber))) {
      errors.hotelRoom = 'Número do quarto deve ter 4 dígitos.';
    }
  }

  if (!products.length) {
    errors.cart = 'Seu carrinho está vazio.';
  }

  return errors;
}
