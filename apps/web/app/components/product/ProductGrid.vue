<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      v-if="title || $slots.header"
      class="flex items-center justify-between"
    >
      <div>
        <h2 v-if="title" class="text-2xl font-bold text-gray-900">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-gray-600 mt-1">
          {{ subtitle }}
        </p>
      </div>
      <div v-if="$slots.header">
        <slot name="header" />
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div v-for="i in skeletonCount" :key="i" class="animate-pulse">
        <div class="bg-gray-200 aspect-square rounded-lg mb-4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!products || products.length === 0"
      class="text-center py-12"
    >
      <UIcon
        name="i-heroicons-shopping-bag"
        class="h-12 w-12 text-gray-400 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Không có sản phẩm nào
      </h3>
      <p class="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
    </div>

    <!-- Products Grid -->
    <div v-else :class="gridClass">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="handleProductClick"
        @add-to-cart="handleAddToCart"
        @wishlist="handleWishlist"
        @quick-view="handleQuickView"
      />
    </div>

    <!-- Load More -->
    <div v-if="showLoadMore && hasMore" class="text-center">
      <UButton
        :loading="loadingMore"
        color="blue"
        variant="outline"
        @click="handleLoadMore"
      >
        {{ loadingMore ? "Đang tải..." : "Xem thêm" }}
      </UButton>
    </div>
  </div>
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
  products?: Product[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
  loadingMore?: boolean;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  showLoadMore?: boolean;
  hasMore?: boolean;
  skeletonCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  loadingMore: false,
  columns: 4,
  showLoadMore: false,
  hasMore: false,
  skeletonCount: 8,
});

const emit = defineEmits<{
  productClick: [product: Product];
  addToCart: [product: Product];
  wishlist: [product: Product];
  quickView: [product: Product];
  loadMore: [];
}>();

const gridClass = computed(() => {
  const baseClasses = "grid gap-6";

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  return `${baseClasses} ${columnClasses[props.columns]}`;
});

const handleProductClick = (product: Product) => {
  emit("productClick", product);
};

const handleAddToCart = (product: Product) => {
  emit("addToCart", product);
};

const handleWishlist = (product: Product) => {
  emit("wishlist", product);
};

const handleQuickView = (product: Product) => {
  emit("quickView", product);
};

const handleLoadMore = () => {
  emit("loadMore");
};
</script>
