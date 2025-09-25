import { defineStore } from "pinia";
import type { Product } from "~/types";

interface WishlistState {
  ids: string[];
  items: Record<string, Product>;
}

const STORAGE_KEY = "wishlist_ids";

function loadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export const useWishlistStore = defineStore("wishlist", {
  state: (): WishlistState => ({
    ids: loadIds(),
    items: {},
  }),

  getters: {
    has: (state) => (id: string) => state.ids.includes(id),
    count: (state) => state.ids.length,
    list: (state): Product[] =>
      state.ids
        .map((id) => state.items[id])
        .filter((p): p is Product => Boolean(p)),
  },

  actions: {
    toggle(product: Product) {
      const index = this.ids.indexOf(product.id);
      if (index >= 0) {
        this.ids.splice(index, 1);
        delete this.items[product.id];
      } else {
        this.ids.push(product.id);
        this.items[product.id] = product;
      }
      saveIds(this.ids);
    },

    remove(id: string) {
      const index = this.ids.indexOf(id);
      if (index >= 0) {
        this.ids.splice(index, 1);
        delete this.items[id];
        saveIds(this.ids);
      }
    },

    clear() {
      this.ids = [];
      this.items = {};
      saveIds(this.ids);
    },
  },
});
