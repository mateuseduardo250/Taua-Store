export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PaymentMethod = 'pix' | 'credit' | 'debit';
export type DeliveryMethod = 'home' | 'hotel';

export type CustomerForm = {
  fullName: string;
  cpf: string;
  phone: string;
};

export type CardForm = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  installments: number;
};

export type HomeDeliveryForm = {
  receiverName: string;
  state: string;
  zipCode: string;
  streetType: 'Rua' | 'Avenida' | 'Alameda' | 'Travessa' | 'Outro';
  streetName: string;
  houseNumber: string;
  reference: string;
  complement: string;
  apartmentBlock: string;
  phone: string;
};

export type HotelDeliveryForm = {
  guestFullName: string;
  guestCpf: string;
  guestPhone: string;
  roomNumber: string;
};

export type CheckoutForm = {
  customer: CustomerForm;
  paymentMethod: PaymentMethod;
  card: CardForm;
  deliveryMethod: DeliveryMethod;
  homeDelivery: HomeDeliveryForm;
  hotelDelivery: HotelDeliveryForm;
};
