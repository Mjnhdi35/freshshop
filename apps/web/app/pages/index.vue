<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Chào mừng đến với Fresh Shop
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            Khám phá những sản phẩm chất lượng cao với giá cả hợp lý
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              size="xl"
              color="white"
              variant="solid"
              to="/products"
              icon="i-heroicons-shopping-bag"
            >
              Mua sắm ngay
            </UButton>
            <UButton
              size="xl"
              color="white"
              variant="outline"
              to="/about"
              icon="i-heroicons-information-circle"
            >
              Tìm hiểu thêm
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Tại sao chọn Fresh Shop?
          </h2>
          <p class="text-lg text-gray-600">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard class="text-center">
            <template #header>
              <UIcon
                name="i-heroicons-truck"
                class="h-12 w-12 text-blue-600 mx-auto mb-4"
              />
              <h3 class="text-xl font-semibold text-gray-900">
                Giao hàng nhanh
              </h3>
            </template>
            <p class="text-gray-600">
              Giao hàng trong vòng 24h với dịch vụ chuyên nghiệp và đáng tin cậy
            </p>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <UIcon
                name="i-heroicons-shield-check"
                class="h-12 w-12 text-blue-600 mx-auto mb-4"
              />
              <h3 class="text-xl font-semibold text-gray-900">
                Chất lượng đảm bảo
              </h3>
            </template>
            <p class="text-gray-600">
              Tất cả sản phẩm đều được kiểm tra chất lượng nghiêm ngặt
            </p>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <UIcon
                name="i-heroicons-heart"
                class="h-12 w-12 text-blue-600 mx-auto mb-4"
              />
              <h3 class="text-xl font-semibold text-gray-900">Hỗ trợ 24/7</h3>
            </template>
            <p class="text-gray-600">
              Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Products Preview Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p class="text-lg text-gray-600">
            Khám phá những sản phẩm được yêu thích nhất
          </p>
        </div>

        <ProductGrid
          :products="featuredProducts"
          :loading="loadingProducts"
          :columns="4"
          title="Sản phẩm nổi bật"
          @product-click="handleProductClick"
          @add-to-cart="handleAddToCart"
          @wishlist="handleWishlist"
          @quick-view="handleQuickView"
        />

        <div class="text-center mt-8">
          <UButton size="lg" color="primary" to="/products">
            Xem tất cả sản phẩm
          </UButton>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Sẵn sàng bắt đầu mua sắm?</h2>
        <p class="text-xl text-blue-100 mb-8">
          Tham gia cùng hàng nghìn khách hàng hài lòng
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            size="xl"
            color="white"
            variant="solid"
            to="/auth/register"
            icon="i-heroicons-user-plus"
          >
            Tạo tài khoản miễn phí
          </UButton>
          <UButton
            size="xl"
            color="white"
            variant="outline"
            to="/auth/login"
            icon="i-heroicons-arrow-right-on-rectangle"
          >
            Đăng nhập
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta
definePageMeta({
  title: "Trang chủ - Fresh Shop",
  description:
    "Khám phá những sản phẩm chất lượng cao với giá cả hợp lý tại Fresh Shop",
});

// SEO
useSeoMeta({
  title: "Fresh Shop - Cửa hàng trực tuyến hàng đầu",
  ogTitle: "Fresh Shop - Cửa hàng trực tuyến hàng đầu",
  description:
    "Khám phá những sản phẩm chất lượng cao với giá cả hợp lý tại Fresh Shop",
  ogDescription:
    "Khám phá những sản phẩm chất lượng cao với giá cả hợp lý tại Fresh Shop",
  ogImage: "/og-image.jpg",
  twitterCard: "summary_large_image",
});

// Sample data for featured products
const featuredProducts = ref([
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description: "Điện thoại thông minh cao cấp với camera chuyên nghiệp",
    price: 29990000,
    originalPrice: 32990000,
    stock: 15,
    image: "/placeholder-product.jpg",
    isFeatured: true,
    category: {
      id: "1",
      name: "Điện thoại",
    },
  },
  {
    id: "2",
    name: "MacBook Air M2",
    description: "Laptop siêu mỏng với hiệu năng mạnh mẽ",
    price: 25990000,
    originalPrice: 27990000,
    stock: 8,
    image: "/placeholder-product.jpg",
    isFeatured: true,
    category: {
      id: "2",
      name: "Laptop",
    },
  },
  {
    id: "3",
    name: "AirPods Pro 2",
    description: "Tai nghe không dây với chống ồn chủ động",
    price: 5990000,
    originalPrice: 6990000,
    stock: 25,
    image: "/placeholder-product.jpg",
    isFeatured: true,
    category: {
      id: "3",
      name: "Phụ kiện",
    },
  },
  {
    id: "4",
    name: "Apple Watch Series 9",
    description: "Đồng hồ thông minh với nhiều tính năng sức khỏe",
    price: 8990000,
    originalPrice: 9990000,
    stock: 12,
    image: "/placeholder-product.jpg",
    isFeatured: true,
    category: {
      id: "4",
      name: "Đồng hồ",
    },
  },
]);

const loadingProducts = ref(false);

// Event handlers
const handleProductClick = (product: any) => {
  navigateTo(`/products/${product.id}`);
};

const handleAddToCart = (product: any) => {
  console.log("Add to cart:", product);
  // TODO: Implement add to cart functionality
};

const handleWishlist = (product: any) => {
  console.log("Add to wishlist:", product);
  // TODO: Implement wishlist functionality
};

const handleQuickView = (product: any) => {
  console.log("Quick view:", product);
  // TODO: Implement quick view modal
};
</script>
