## Fresh Shop Web (Nuxt 4)

Giao diện cửa hàng viết bằng Nuxt 4, Pinia, Nuxt UI và Tailwind CSS.

### Công nghệ

- Nuxt 4, Vue 3, Pinia
- Nuxt UI, Tailwind CSS v4
- Server routes nội bộ `app/server/api` (mock data)

### Yêu cầu

- Node.js 18+

### Cài đặt

```bash
npm install
```

### Biến môi trường

Tạo `.env` (hoặc export env) để trỏ tới API (nếu dùng API bên ngoài):

```bash
# dùng bởi runtimeConfig.public.apiBase
API_BASE_URL=http://localhost:3000/api/v1
```

### Scripts

```bash
npm run dev       # chạy dev server
npm run build     # build production
npm run preview   # preview sau khi build
npm run generate  # prerender (SSG)
```

### Cấu trúc

- `app/components` — UI, layout, forms, product components
- `app/pages` — routes (products, cart, auth, v.v.)
- `app/stores` — Pinia stores (`products`, `cart`, `wishlist`)
- `app/composables` — `useApi`, `useAuth`, `useProducts`, `useCart`
- `app/server/api` — mock product endpoints
- `app/assets/css/main.css` — Tailwind entry
- `nuxt.config.ts` — modules, runtime config

### State & Composables

Xem `apps/web/docs/STATE_AND_COMPOSABLES.md`.

### Tailwind

Cấu hình qua `@nuxtjs/tailwindcss` (Tailwind v4).

### Triển khai

Build và chạy Node server:

```bash
npm run build && npm run preview
```
