<template>
  <section class="py-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-6">Giỏ hàng</h1>

      <EmptyState
        v-if="isEmpty"
        title="Giỏ hàng trống"
        description="Hãy thêm vài sản phẩm để tiếp tục mua sắm."
      />

      <div v-else class="space-y-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
        >
          <img
            :src="item.product.image || '/placeholder-product.jpg'"
            :alt="item.product.name"
            class="w-20 h-20 rounded object-cover"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">{{ item.product.name }}</h3>
            <div class="text-sm text-gray-500">
              Giá: {{ formatPrice(item.product.price) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UButton variant="outline" size="sm" @click="dec(item.id)"
              >-</UButton
            >
            <span class="w-8 text-center">{{ item.quantity }}</span>
            <UButton variant="outline" size="sm" @click="inc(item.id)"
              >+</UButton
            >
          </div>
          <div class="w-28 text-right font-semibold">
            {{ formatPrice(item.product.price * item.quantity) }}
          </div>
          <UButton
            icon="i-heroicons-trash"
            color="error"
            variant="ghost"
            @click="remove(item.id)"
          />
        </div>

        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Tổng cộng</h2>
          </template>
          <div class="flex items-center justify-between">
            <span>Tạm tính</span>
            <span class="font-semibold">{{ formatPrice(subtotal) }}</span>
          </div>
          <div class="mt-4 flex justify-end gap-3">
            <UButton variant="ghost" color="neutral" @click="clear"
              >Xóa giỏ hàng</UButton
            >
            <UButton color="primary">Thanh toán</UButton>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCart } from "~/composables/useCart";
import type { CartItem } from "~/types";

definePageMeta({ title: "Giỏ hàng" });

const { items, isEmpty, subtotal, updateQuantity, remove, clear } = useCart();

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

const inc = (id: string) => {
  const item = items.value.find((i: CartItem) => i.id === id);
  if (!item) return;
  updateQuantity(id, item.quantity + 1);
};

const dec = (id: string) => {
  const item = items.value.find((i: CartItem) => i.id === id);
  if (!item) return;
  updateQuantity(id, item.quantity - 1);
};
</script>
