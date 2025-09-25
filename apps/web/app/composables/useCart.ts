import { storeToRefs } from "pinia";
import { useCartStore } from "~/stores/cart";

export const useCart = () => {
  const store = useCartStore();
  const { items, itemCount, subtotal, isEmpty } = storeToRefs(store as any);

  const add = store.add;
  const remove = store.remove;
  const updateQuantity = store.updateQuantity;
  const clear = store.clear;

  return {
    items,
    itemCount,
    subtotal,
    isEmpty,
    add,
    remove,
    updateQuantity,
    clear,
  };
};
