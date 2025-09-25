<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Yêu thích</h1>
        <UButton v-if="count > 0" variant="ghost" color="neutral" @click="clear"
          >Xóa tất cả</UButton
        >
      </div>

      <EmptyState
        v-if="count === 0"
        title="Danh sách trống"
        description="Hãy thêm sản phẩm yêu thích của bạn."
      />

      <ProductGrid
        v-else
        :products="list"
        :columns="4"
        title="Sản phẩm yêu thích"
        @product-click="goDetail"
        @add-to-cart="addToCart"
        @wishlist="toggleWishlist"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import { useWishlistStore } from "~/stores/wishlist";
import { storeToRefs } from "pinia";
import { computed } from "vue";

definePageMeta({ title: "Yêu thích" });

const router = useRouter();
const { add } = useCart();
const wishlist = useWishlistStore();

const list = computed(() => wishlist.list);
const count = computed(() => wishlist.count);

const goDetail = (p: any) => router.push(`/products/${p.id}`);
const addToCart = (p: any) => add(p, 1);
const toggleWishlist = (p: any) => wishlist.toggle(p);
const clear = () => wishlist.clear();
</script>
