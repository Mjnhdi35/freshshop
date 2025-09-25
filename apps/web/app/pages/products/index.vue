<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Tất cả sản phẩm</h1>
          <p class="text-gray-600">Khám phá danh mục sản phẩm phong phú</p>
        </div>
        <SearchBar class="w-full sm:w-80" @submit="onSearch" />
      </div>

      <ProductGrid
        :products="products"
        :loading="loading"
        :loading-more="loadingMore"
        :has-more="hasMore"
        show-load-more
        title="Danh sách sản phẩm"
        @load-more="loadMore"
        @product-click="goDetail"
        @add-to-cart="addToCart"
        @wishlist="toggleWishlist"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";
import { useCart } from "~/composables/useCart";
import { useWishlistStore } from "~/stores/wishlist";

definePageMeta({
  title: "Sản phẩm - Fresh Shop",
});

useSeoMeta({
  title: "Danh sách sản phẩm",
});

const router = useRouter();
const wishlist = useWishlistStore();
const {
  items: products,
  loading,
  loadingMore,
  hasMore,
  fetch,
  loadMore,
} = useProducts();
const { add } = useCart();

const route = useRoute();
const q = ref<string>((route.query.q as string) || "");

const onSearch = (keyword: string) => {
  q.value = keyword;
  fetch({ page: 1, q: q.value });
};

const goDetail = (p: any) => router.push(`/products/${p.id}`);
const addToCart = (p: any) => add(p, 1);
const toggleWishlist = (p: any) => wishlist.toggle(p);

onMounted(() => {
  fetch({ page: 1, q: q.value });
});
</script>
