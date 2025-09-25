# SEO, Hiệu năng và Khả năng truy cập (A11y)

Tài liệu này giải thích kỹ thuật đã áp dụng và cách sử dụng trong dự án Nuxt 4.

## SEO (Tối ưu công cụ tìm kiếm)

- `htmlAttrs.lang = 'vi'` trong `nuxt.config.ts` giúp máy tìm kiếm nhận biết ngôn ngữ.
- Meta tags: `description`, `robots`, `og:*` (Open Graph) để chia sẻ mạng xã hội.
- Tiêu đề trang: đặt ở `app.head.title` hoặc per‑page bằng `useSeoMeta`.
- Sitemap/robots: có thể bổ sung module sitemap để index tốt hơn.

Sử dụng per‑page:

```ts
useSeoMeta({
  title: "Tiêu đề trang",
  description: "Mô tả...",
  ogTitle: "Tiêu đề OG",
  ogDescription: "Mô tả OG",
});
```

## Hiệu năng

- Nitro `routeRules` với `swr` cho các route tĩnh (home, products) nhằm cache 60s.
- Preconnect tới Google Fonts để giảm độ trễ.
- Tailwind v4 + Nuxt UI giúp CSS gọn nhẹ.
- Dùng lazy images (`loading="lazy"`) cho hình ảnh (đã áp dụng trong `ProductCard`).

Khuyến nghị:

- Dùng CDN cho ảnh sản phẩm.
- Tối ưu bundle: kiểm tra `analyze`, tách vendor nếu cần.

## Khả năng truy cập (A11y)

- Skip‑link: liên kết "Bỏ qua điều hướng" giúp keyboard users nhảy tới nội dung chính.
- Màu sắc/độ tương phản: theme color có độ tương phản tốt, dark mode hỗ trợ `useColorMode`.
- ARIA/semantic: thêm thuộc tính aria khi cần, thẻ heading đúng thứ tự.

Ví dụ skip‑link:

```html
<a href="#main" class="sr-only focus:not-sr-only ..."
  >Bỏ qua nội dung điều hướng</a
>
```

## Kiểm thử

- Lighthouse trong Chrome DevTools: kiểm tra SEO, Performance, A11y.
- Kiểm tra keyboard navigation: Tab/Shift+Tab qua các phần tử, skip‑link hoạt động.
