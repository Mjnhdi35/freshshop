<template>
  <UCard
    class="group hover:shadow-lg transition-all duration-300 cursor-pointer"
    :ui="{ body: { padding: 'p-0' } }"
    @click="handleClick"
  >
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden rounded-t-lg">
      <img
        :src="product.image || '/placeholder-product.jpg'"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <Badge v-if="product.isFeatured" color="red" variant="solid" size="xs">
          Nổi bật
        </Badge>
        <Badge
          v-if="product.originalPrice && product.originalPrice > product.price"
          color="green"
          variant="solid"
          size="xs"
        >
          Giảm giá
        </Badge>
      </div>

      <!-- Quick Actions -->
      <div
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <UButton
          icon="i-heroicons-heart"
          size="sm"
          color="white"
          variant="solid"
          class="shadow-lg"
          @click.stop="handleWishlist"
        />
      </div>

      <!-- Stock Status -->
      <div
        v-if="product.stock === 0"
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <Badge color="red" variant="solid" size="lg"> Hết hàng </Badge>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4 space-y-2">
      <!-- Category -->
      <div
        v-if="product.category"
        class="text-xs text-gray-500 uppercase tracking-wide"
      >
        {{ product.category.name }}
      </div>

      <!-- Product Name -->
      <h3
        class="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors"
      >
        {{ product.name }}
      </h3>

      <!-- Description -->
      <p v-if="product.description" class="text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Price -->
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-gray-900">
          {{ formatPrice(product.price) }}
        </span>
        <span
          v-if="product.originalPrice && product.originalPrice > product.price"
          class="text-sm text-gray-500 line-through"
        >
          {{ formatPrice(product.originalPrice) }}
        </span>
      </div>

      <!-- Rating & Reviews -->
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <div class="flex items-center">
          <UIcon
            v-for="i in 5"
            :key="i"
            name="i-heroicons-star-solid"
            class="h-4 w-4 text-yellow-400"
          />
        </div>
        <span>(4.5)</span>
        <span>•</span>
        <span>12 đánh giá</span>
      </div>

      <!-- Stock Info -->
      <div class="text-xs text-gray-500">
        Còn lại: {{ product.stock }} sản phẩm
      </div>

      <!-- Actions -->
      <div class="flex gap-2 pt-2">
        <UButton
          :disabled="product.stock === 0"
          color="blue"
          variant="solid"
          size="sm"
          class="flex-1"
          @click.stop="handleAddToCart"
        >
          <UIcon name="i-heroicons-shopping-cart" class="h-4 w-4" />
          Thêm vào giỏ
        </UButton>

        <UButton variant="outline" size="sm" @click.stop="handleQuickView">
          <UIcon name="i-heroicons-eye" class="h-4 w-4" />
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image?: string;
  isFeatured: boolean;
  category?: {
    id: string;
    name: string;
  };
}

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [product: Product];
  addToCart: [product: Product];
  wishlist: [product: Product];
  quickView: [product: Product];
}>();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const handleClick = () => {
  emit("click", props.product);
};

const handleAddToCart = () => {
  emit("addToCart", props.product);
};

const handleWishlist = () => {
  emit("wishlist", props.product);
};

const handleQuickView = () => {
  emit("quickView", props.product);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
