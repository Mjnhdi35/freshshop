## Tổng quan

Dự án sử dụng Nuxt 4 với Pinia cho state management và composables để tái sử dụng logic. Tất cả API gọi qua `useApi` nhằm đảm bảo đồng nhất baseURL, headers, và xử lý lỗi.

### Cấu trúc chính

- `app/stores/`: Pinia stores (`products`, `cart`, `wishlist`)
- `app/composables/`: Composables (`useApi`, `useAuth`, `useProducts`, `useCart`)
- `app/types/`: Kiểu dữ liệu dùng chung

---

## `useApi`

File: `app/composables/useApi.ts`

Mục đích: Bọc `$fetch` với `runtimeConfig.public.apiBase`, tự động đính kèm `Authorization: Bearer <token>` nếu có, và chuẩn hóa lỗi.

Sử dụng:

```ts
const { get, post } = useApi();
// Gọi nội bộ Nuxt server route
const res = await get("/api/products", { page: 1 });
```

---

## Products Store

File: `app/stores/products.ts`

Trạng thái: danh sách sản phẩm phân trang, cache theo `byId`, loading/error.

API:

- `fetchProducts({ page, pageSize, q, categoryId })` (điểm đến `/api/products`)
- `loadMore()`
- `fetchById(id)`

Sử dụng qua composable:

```ts
const { items, loading, fetch, loadMore, fetchById } = useProducts();
await fetch({ page: 1 });

### Nuxt Server API
Các route nội bộ (mock data) nằm tại:

- `app/server/api/products/index.get.ts` — danh sách có phân trang
- `app/server/api/products/[id].get.ts` — chi tiết sản phẩm
```

---

## Cart Store

File: `app/stores/cart.ts`

Trạng thái: `items: CartItem[]`, persist `localStorage`.

Getters: `itemCount`, `subtotal`, `isEmpty`.

Actions: `add(product, qty)`, `remove(id)`, `updateQuantity(id, qty)`, `clear()`.

Sử dụng qua composable:

```ts
const { items, add, updateQuantity, remove, subtotal } = useCart();
add(product, 1);
```

---

## Wishlist Store

File: `app/stores/wishlist.ts`

Trạng thái: `ids: string[]`, `items: Record<string, Product>`, persist `localStorage`.

API: `toggle(product)`, `remove(id)`, `clear()`; Getters: `has(id)`, `count`, `list`.

---

## Pages sử dụng state/composables

- `pages/products/index.vue`: hiển thị danh sách với `ProductGrid`, hỗ trợ search, load more.
- `pages/products/[id].vue`: chi tiết sản phẩm, thêm vào giỏ, yêu thích.
- `pages/cart.vue`: hiển thị giỏ hàng, tăng/giảm số lượng, xóa, tổng tiền.
- `pages/wishlist.vue`: danh sách yêu thích, thêm vào giỏ, xóa tất cả.

---

## Kiểu dữ liệu

File: `app/types/index.ts`

- `Product`, `Category`, `CartItem`, `Paginated<T>`
- `app/types/auth.ts`: `User`, `LoginRequest`, `RegisterRequest`, `ApiResponse<T>`

---

## Gợi ý mở rộng

- Thêm refresh token flow trong `useApi`
- SSR prefetch dữ liệu sản phẩm bằng `useAsyncData`
- Unit test cho stores bằng Vitest
