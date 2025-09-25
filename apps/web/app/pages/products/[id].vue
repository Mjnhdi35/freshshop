<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-20">
        <LoadingSpinner />
      </div>

      <div v-else-if="!product" class="text-center py-20">
        <EmptyState
          title="Không tìm thấy sản phẩm"
          description="Sản phẩm có thể đã bị xóa hoặc không tồn tại."
        />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            :src="product.image || '/placeholder-product.jpg'"
            :alt="product.name"
            class="w-full rounded-lg"
          />
        </div>

        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="text-gray-600">{{ product.description }}</p>

          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold text-gray-900">{{
              formatPrice(product.price)
            }}</span>
            <span
              v-if="
                product.originalPrice && product.originalPrice > product.price
              "
              class="text-gray-500 line-through"
            >
              {{ formatPrice(product.originalPrice) }}
            </span>
          </div>

          <div class="text-sm text-gray-500">
            Còn lại: {{ product.stock }} sản phẩm
          </div>

          <div class="flex gap-3 pt-2">
            <UButton
              :disabled="product.stock === 0"
              color="primary"
              @click="addToCart(product)"
            >
              <UIcon name="i-heroicons-shopping-cart" class="h-5 w-5" />
              Thêm vào giỏ
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              @click="toggleWishlist(product)"
            >
              <UIcon name="i-heroicons-heart" class="h-5 w-5" />
              Yêu thích
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProducts } from "~/composables/useProducts";
import { useCart } from "~/composables/useCart";
import { useWishlistStore } from "~/stores/wishlist";

definePageMeta({
  title: "Chi tiết sản phẩm",
});

const route = useRoute();
const id = route.params.id as string;

const { fetchById, loading } = useProducts();
const product = ref<any | null>(null);

const { add } = useCart();
const wishlist = useWishlistStore();

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

const addToCart = (p: any) => add(p, 1);
const toggleWishlist = (p: any) => wishlist.toggle(p);

onMounted(async () => {
  product.value = await fetchById(id);
});
</script>
