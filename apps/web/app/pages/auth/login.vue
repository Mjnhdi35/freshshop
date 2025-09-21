<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập vào Fresh Shop
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Hoặc
          <NuxtLink
            to="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            tạo tài khoản mới
          </NuxtLink>
        </p>
      </div>

      <UCard class="mt-8">
        <UForm :state="form" @submit="handleLogin" class="space-y-6">
          <UFormGroup label="Email" name="email" required>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="Nhập email của bạn"
              :disabled="isLoading"
              icon="i-heroicons-envelope"
            />
          </UFormGroup>

          <UFormGroup label="Mật khẩu" name="password" required>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Nhập mật khẩu"
              :disabled="isLoading"
              icon="i-heroicons-lock-closed"
            />
          </UFormGroup>

          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <UIcon
                  name="i-heroicons-exclamation-triangle"
                  class="h-5 w-5 text-red-400"
                />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ errorMessage }}
                </h3>
              </div>
            </div>
          </div>

          <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="h-5 w-5 text-green-400"
                />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">
                  {{ successMessage }}
                </h3>
              </div>
            </div>
          </div>

          <UButton
            type="submit"
            block
            :loading="isLoading"
            :disabled="!form.email || !form.password"
            class="w-full"
          >
            {{ isLoading ? "Đang đăng nhập..." : "Đăng nhập" }}
          </UButton>
        </UForm>
      </UCard>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          Quay lại
          <NuxtLink
            to="/"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            trang chủ
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from "~/types/auth";

// Meta
definePageMeta({
  layout: "auth",
  title: "Đăng nhập",
});

// Auth composable
const { login, isLoading, isAuthenticated } = useAuth();

// Form state
const form = reactive<LoginRequest>({
  email: "",
  password: "",
});

// Messages
const errorMessage = ref("");
const successMessage = ref("");

// Redirect if already authenticated
watch(
  isAuthenticated,
  (authenticated) => {
    if (authenticated) {
      navigateTo("/");
    }
  },
  { immediate: true },
);

// Handle login
const handleLogin = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  const result = await login(form);

  if (result.success) {
    successMessage.value = result.message;
    setTimeout(() => {
      navigateTo("/");
    }, 1000);
  } else {
    errorMessage.value = result.message;
  }
};

// Clear messages when form changes
watch(form, () => {
  errorMessage.value = "";
  successMessage.value = "";
});
</script>
