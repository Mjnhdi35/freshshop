<template>
  <UFooter class="bg-gray-50 border-t border-gray-200">
    <template #left>
      <div class="flex items-center space-x-2">
        <UIcon name="i-heroicons-shopping-bag" class="h-6 w-6 text-blue-600" />
        <span class="text-lg font-bold text-gray-900">Fresh Shop</span>
      </div>
    </template>

    <template #right>
      <div class="flex items-center space-x-6">
        <UButton
          variant="ghost"
          color="gray"
          size="sm"
          icon="i-heroicons-envelope"
          to="/contact"
        >
          Liên hệ
        </UButton>
        <UButton
          variant="ghost"
          color="gray"
          size="sm"
          icon="i-heroicons-question-mark-circle"
          to="/help"
        >
          Trợ giúp
        </UButton>
      </div>
    </template>

    <!-- Main Footer Content -->
    <div class="mt-8 pt-8 border-t border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-heroicons-shopping-bag"
              class="h-8 w-8 text-blue-600"
            />
            <span class="text-xl font-bold text-gray-900">Fresh Shop</span>
          </div>
          <p class="text-gray-600 text-sm">
            Cửa hàng trực tuyến hàng đầu với những sản phẩm chất lượng cao và
            giá cả hợp lý.
          </p>
          <div class="flex space-x-4">
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-facebook"
              @click="openSocial('facebook')"
            />
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-chat-bubble-left-right"
              @click="openSocial('twitter')"
            />
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-camera"
              @click="openSocial('instagram')"
            />
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-play"
              @click="openSocial('youtube')"
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3
            class="text-sm font-semibold text-gray-900 uppercase tracking-wide"
          >
            Liên kết nhanh
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-4">
          <h3
            class="text-sm font-semibold text-gray-900 uppercase tracking-wide"
          >
            Hỗ trợ khách hàng
          </h3>
          <ul class="space-y-2">
            <li v-for="link in customerServiceLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h3
            class="text-sm font-semibold text-gray-900 uppercase tracking-wide"
          >
            Thông tin liên hệ
          </h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-phone" class="h-4 w-4 text-gray-400" />
              <span class="text-sm text-gray-600">+84 123 456 789</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon
                name="i-heroicons-envelope"
                class="h-4 w-4 text-gray-400"
              />
              <span class="text-sm text-gray-600">support@freshshop.com</span>
            </div>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-map-pin" class="h-4 w-4 text-gray-400" />
              <span class="text-sm text-gray-600"
                >123 Đường ABC, Quận 1, TP.HCM</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div class="flex items-center space-x-6 text-sm text-gray-500">
            <span>&copy; 2024 Fresh Shop. Tất cả quyền được bảo lưu.</span>
            <NuxtLink
              to="/privacy"
              class="hover:text-blue-600 transition-colors"
            >
              Chính sách bảo mật
            </NuxtLink>
            <NuxtLink to="/terms" class="hover:text-blue-600 transition-colors">
              Điều khoản sử dụng
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Phương thức thanh toán:</span>
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold"
              >
                V
              </div>
              <div
                class="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold"
              >
                M
              </div>
              <div
                class="w-8 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold"
              >
                P
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UFooter>
</template>

<script setup lang="ts">
interface FooterLink {
  name: string;
  href: string;
}

// Quick links
const quickLinks: FooterLink[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Danh mục", href: "/categories" },
  { name: "Tin tức", href: "/posts" },
  { name: "Về chúng tôi", href: "/about" },
];

// Customer service links
const customerServiceLinks: FooterLink[] = [
  { name: "Hướng dẫn mua hàng", href: "/help/shopping" },
  { name: "Chính sách đổi trả", href: "/help/returns" },
  { name: "Vận chuyển", href: "/help/shipping" },
  { name: "Bảo hành", href: "/help/warranty" },
  { name: "Câu hỏi thường gặp", href: "/help/faq" },
];

const openSocial = (platform: string) => {
  const urls = {
    facebook: "https://facebook.com/freshshop",
    twitter: "https://twitter.com/freshshop",
    instagram: "https://instagram.com/freshshop",
    youtube: "https://youtube.com/freshshop",
  };

  window.open(urls[platform as keyof typeof urls], "_blank");
};
</script>
