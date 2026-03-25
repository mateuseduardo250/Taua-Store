'use client';

import { CartItem } from '@/types/store';

const CART_KEY = 'taua-store-cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
