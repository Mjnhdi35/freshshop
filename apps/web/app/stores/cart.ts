import { defineStore } from "pinia";
import type { CartItem, Product } from "~/types";

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = "cart_items";

function loadFromStorage(): CartItem[] {
  if (!process.client) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: CartItem[]) {
  if (!process.client) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: loadFromStorage(),
  }),

  getters: {
    itemCount: (state): number =>
      state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state): number =>
      state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    isEmpty(): boolean {
      return this.items.length === 0;
    },
  },

  actions: {
    add(product: Product, quantity = 1) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          product.stock,
        );
      } else {
        this.items.push({
          id: product.id,
          product,
          quantity: Math.min(quantity, product.stock),
        });
      }
      saveToStorage(this.items);
    },

    remove(productId: string) {
      this.items = this.items.filter((i) => i.id !== productId);
      saveToStorage(this.items);
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((i) => i.id === productId);
      if (!item) return;
      item.quantity = Math.max(1, Math.min(quantity, item.product.stock));
      saveToStorage(this.items);
    },

    clear() {
      this.items = [];
      saveToStorage(this.items);
    },
  },
});
