import { storeToRefs } from "pinia";
import { useProductsStore } from "~/stores/products";

export const useProducts = () => {
  const store = useProductsStore();
  const { items, loading, loadingMore, hasMore, page, pageSize, total, error } =
    storeToRefs(store);

  const fetch = (params?: {
    page?: number;
    pageSize?: number;
    q?: string;
    categoryId?: string;
  }) => store.fetchProducts(params);

  const loadMore = () => store.loadMore();
  const fetchById = (id: string) => store.fetchById(id);

  return {
    // state
    items,
    loading,
    loadingMore,
    hasMore,
    page,
    pageSize,
    total,
    error,
    // actions
    fetch,
    loadMore,
    fetchById,
  };
};
