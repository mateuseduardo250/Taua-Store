import { Product } from '@/types/store';

export const products: Product[] = [
  {
    id: 'toalha-piscina',
    name: 'Toalha Premium para Piscina',
    description: 'Toalha macia e confortável para usar nas áreas de lazer do hotel.',
    price: 79.9,
    stock: 18,
    image: '🏖️',
    category: 'Lazer'
  },
  {
    id: 'combo-burguer',
    name: 'Combo Burguer Tauá',
    description: 'Hambúrguer artesanal com fritas e refrigerante.',
    price: 42.5,
    stock: 32,
    image: '🍔',
    category: 'Alimentos'
  },
  {
    id: 'pelucia-oficial',
    name: 'Pelúcia Oficial',
    description: 'Pelúcia temática para presentear as crianças.',
    price: 95,
    stock: 11,
    image: '🧸',
    category: 'Souvenirs'
  },
  {
    id: 'chinelo-personalizado',
    name: 'Chinelo Personalizado',
    description: 'Chinelo confortável com identidade da loja.',
    price: 34.9,
    stock: 44,
    image: '🩴',
    category: 'Souvenirs'
  },
  {
    id: 'suco-natural',
    name: 'Suco Natural 500ml',
    description: 'Suco gelado feito na hora com frutas frescas.',
    price: 15.9,
    stock: 26,
    image: '🧃',
    category: 'Bebidas'
  }
];
