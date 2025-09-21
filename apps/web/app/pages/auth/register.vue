<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Tạo tài khoản Fresh Shop
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Hoặc
          <NuxtLink
            to="/auth/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            đăng nhập với tài khoản có sẵn
          </NuxtLink>
        </p>
      </div>

      <UCard class="mt-8">
        <UForm :state="form" @submit="handleRegister" class="space-y-6">
          <UFormGroup label="Họ và tên" name="name" required>
            <UInput
              v-model="form.name"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              :disabled="isLoading"
              icon="i-heroicons-user"
            />
          </UFormGroup>

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

          <UFormGroup label="Xác nhận mật khẩu" name="confirmPassword" required>
            <UInput
              v-model="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              :disabled="isLoading"
              icon="i-heroicons-lock-closed"
            />
          </UFormGroup>

          <div v-if="passwordMismatch" class="rounded-md bg-yellow-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <UIcon
                  name="i-heroicons-exclamation-triangle"
                  class="h-5 w-5 text-yellow-400"
                />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                  Mật khẩu không khớp
                </h3>
              </div>
            </div>
          </div>

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
            :disabled="!isFormValid"
            class="w-full"
          >
            {{ isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản" }}
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
import type { RegisterRequest } from "~/types/auth";

// Meta
definePageMeta({
  layout: "auth",
  title: "Đăng ký",
});

// Auth composable
const { register, isLoading, isAuthenticated } = useAuth();

// Form state
const form = reactive<RegisterRequest>({
  name: "",
  email: "",
  password: "",
});

const confirmPassword = ref("");

// Messages
const errorMessage = ref("");
const successMessage = ref("");

// Computed
const passwordMismatch = computed(() => {
  return confirmPassword.value && form.password !== confirmPassword.value;
});

const isFormValid = computed(() => {
  return (
    form.name &&
    form.email &&
    form.password &&
    confirmPassword.value &&
    !passwordMismatch.value
  );
});

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

// Handle register
const handleRegister = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (passwordMismatch.value) {
    errorMessage.value = "Mật khẩu không khớp";
    return;
  }

  const result = await register(form);

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
watch([form, confirmPassword], () => {
  errorMessage.value = "";
  successMessage.value = "";
});
</script>
