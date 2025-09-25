import { defineStore } from "pinia";
import type { Paginated, Product } from "~/types";
import { useApi } from "~/composables/useApi";
import type { ApiResponse } from "~/types/auth";

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  byId: Record<string, Product>;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    items: [],
    total: 0,
    page: 1,
    pageSize: 12,
    hasMore: false,
    byId: {},
    loading: false,
    loadingMore: false,
    error: null,
  }),

  getters: {
    isEmpty: (state): boolean => state.items.length === 0,
    getById: (state) => {
      return (id: string): Product | undefined => state.byId[id];
    },
  },

  actions: {
    async fetchProducts(params?: {
      page?: number;
      pageSize?: number;
      q?: string;
      categoryId?: string;
    }) {
      const { get } = useApi();
      this.loading = true;
      this.error = null;

      try {
        const page = params?.page ?? 1;
        const pageSize = params?.pageSize ?? this.pageSize;

        const res = await get<Paginated<Product>>("/api/products", {
          page,
          pageSize,
          q: params?.q,
          categoryId: params?.categoryId,
        });

        const data = res.data as Paginated<Product>;
        this.items = data.items;
        this.total = data.total;
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.hasMore = data.hasMore;
        this.byId = Object.fromEntries(data.items.map((p) => [p.id, p]));
      } catch (e: any) {
        this.error = e?.message || "Không thể tải danh sách sản phẩm";
      } finally {
        this.loading = false;
      }
    },

    async loadMore() {
      if (this.loadingMore || !this.hasMore) return;
      const { get } = useApi();
      this.loadingMore = true;
      this.error = null;
      try {
        const nextPage = this.page + 1;
        const res = await get<Paginated<Product>>("/api/products", {
          page: nextPage,
          pageSize: this.pageSize,
        });
        const data = res.data as Paginated<Product>;
        this.items = [...this.items, ...data.items];
        this.total = data.total;
        this.page = data.page;
        this.pageSize = data.pageSize;
        this.hasMore = data.hasMore;
        data.items.forEach((p) => (this.byId[p.id] = p));
      } catch (e: any) {
        this.error = e?.message || "Không thể tải thêm sản phẩm";
      } finally {
        this.loadingMore = false;
      }
    },

    async fetchById(id: string) {
      if (this.byId[id]) return this.byId[id];
      const { get } = useApi();
      this.loading = true;
      this.error = null;
      try {
        const res = await get<Product>(`/api/products/${id}`);
        const product = res.data as unknown as Product;
        this.byId[product.id] = product;
        return product;
      } catch (e: any) {
        this.error = e?.message || "Không thể tải sản phẩm";
        return undefined;
      } finally {
        this.loading = false;
      }
    },
  },
});
