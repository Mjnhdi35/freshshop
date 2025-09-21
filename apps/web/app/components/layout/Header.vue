<template>
  <UHeader
    :ui="headerUi"
    class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
  >
    <!-- Left Section -->
    <template #left>
      <div class="flex items-center gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <UIcon
            name="i-heroicons-shopping-bag"
            class="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors"
          />
          <span
            class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"
          >
            Fresh Shop
          </span>
        </NuxtLink>

        <!-- Navigation Menu (Desktop) -->
        <nav class="hidden lg:flex items-center space-x-6">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === item.href }"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </template>

    <!-- Right Section -->
    <template #right>
      <div class="flex items-center gap-4">
        <!-- Search Bar -->
        <div class="hidden md:block w-64">
          <SearchBar
            :placeholder="searchPlaceholder"
            size="sm"
            @search="handleSearch"
          />
        </div>

        <!-- Cart -->
        <UButton
          variant="ghost"
          color="gray"
          size="sm"
          class="relative"
          @click="navigateTo('/cart')"
        >
          <UIcon name="i-heroicons-shopping-cart" class="h-5 w-5" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartCount > 99 ? "99+" : cartCount }}
          </span>
        </UButton>

        <!-- User Menu -->
        <div v-if="isAuthenticated" class="flex items-center gap-2">
          <!-- Notifications -->
          <UButton
            variant="ghost"
            color="gray"
            size="sm"
            icon="i-heroicons-bell"
            @click="handleNotifications"
          />

          <!-- User Dropdown -->
          <UDropdown :items="userMenuItems">
            <UAvatar
              :src="user?.avatar"
              :alt="user?.name"
              size="sm"
              class="cursor-pointer"
            />
            <template #item="{ item }">
              <UIcon :name="item.icon" class="h-4 w-4" />
              <span>{{ item.label }}</span>
            </template>
          </UDropdown>
        </div>

        <!-- Guest Actions -->
        <div v-else class="flex items-center gap-2">
          <UButton variant="ghost" color="gray" size="sm" to="/auth/login">
            Đăng nhập
          </UButton>
          <UButton color="blue" size="sm" to="/auth/register">
            Đăng ký
          </UButton>
        </div>

        <!-- Mobile Menu Button -->
        <UButton
          variant="ghost"
          color="gray"
          size="sm"
          icon="i-heroicons-bars-3"
          class="lg:hidden"
          @click="toggleMobileMenu"
        />
      </div>
    </template>
  </UHeader>

  <!-- Mobile Menu -->
  <div
    v-if="showMobileMenu"
    class="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
    @click="closeMobileMenu"
  >
    <div
      class="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
      @click.stop
    >
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Menu</h3>
          <UButton
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            @click="closeMobileMenu"
          />
        </div>
      </div>

      <div class="p-4 space-y-4">
        <!-- Mobile Search -->
        <SearchBar placeholder="Tìm kiếm..." size="sm" @search="handleSearch" />

        <!-- Mobile Navigation -->
        <nav class="space-y-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Mobile User Actions -->
        <div
          v-if="!isAuthenticated"
          class="pt-4 border-t border-gray-200 space-y-2"
        >
          <UButton
            variant="outline"
            color="gray"
            size="sm"
            class="w-full"
            to="/auth/login"
            @click="closeMobileMenu"
          >
            Đăng nhập
          </UButton>
          <UButton
            color="blue"
            size="sm"
            class="w-full"
            to="/auth/register"
            @click="closeMobileMenu"
          >
            Đăng ký
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NavigationItem {
  name: string;
  href: string;
}

interface UserMenuItem {
  label: string;
  icon: string;
  click?: () => void;
}

const { user, isAuthenticated, logout } = useAuth();

// Props
const searchPlaceholder = ref("Tìm kiếm sản phẩm...");
const cartCount = ref(0);
const showMobileMenu = ref(false);

// Navigation items
const navigationItems: NavigationItem[] = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Danh mục", href: "/categories" },
  { name: "Tin tức", href: "/posts" },
  { name: "Liên hệ", href: "/contact" },
];

// User menu items
const userMenuItems: UserMenuItem[] = computed(() => [
  [
    {
      label: "Hồ sơ",
      icon: "i-heroicons-user",
      click: () => navigateTo("/profile"),
    },
  ],
  [
    {
      label: "Đơn hàng",
      icon: "i-heroicons-shopping-bag",
      click: () => navigateTo("/orders"),
    },
  ],
  [
    {
      label: "Yêu thích",
      icon: "i-heroicons-heart",
      click: () => navigateTo("/wishlist"),
    },
  ],
  [
    {
      label: "Cài đặt",
      icon: "i-heroicons-cog-6-tooth",
      click: () => navigateTo("/settings"),
    },
  ],
  [
    {
      label: "Đăng xuất",
      icon: "i-heroicons-arrow-right-on-rectangle",
      click: logout,
    },
  ],
]);

const headerUi = computed(() => ({
  wrapper: "relative",
  container: "flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8",
  left: "flex items-center gap-4",
  right: "flex items-center gap-4",
}));

const handleSearch = (query: string) => {
  navigateTo(`/search?q=${encodeURIComponent(query)}`);
};

const handleNotifications = () => {
  // Handle notifications
  console.log("Open notifications");
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

// Close mobile menu on route change
watch(
  () => useRoute().path,
  () => {
    closeMobileMenu();
  },
);

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
