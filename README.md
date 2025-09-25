# Fresh Shop Monorepo

Monorepo thương mại điện tử hiện đại gồm API (NestJS) và Web (Nuxt 4).

## Kiến trúc

**Monorepo Monolith**: Một repository chứa nhiều ứng dụng nhưng backend hiện tại là một monolith NestJS, frontend là một ứng dụng Nuxt 4.

- `apps/api` — NestJS 11 monolith (modules bên trong), TypeORM, PostgreSQL, Redis
- `apps/web` — Nuxt 4 SPA/SSR, Pinia, Nuxt UI, Tailwind CSS

### Lý do chọn Monorepo Monolith

- **Giảm độ phức tạp vận hành**: Một repo, một quy trình build/deploy
- **Dễ tái lập và triển khai**: Docker Compose đơn giản, shared configs
- **Tối ưu developer experience**: Hot reload, shared types, unified tooling
- **Sẵn sàng mở rộng**: Có thể tách thành microservices khi cần thiết

## Bắt đầu nhanh

### Yêu cầu

- Node.js 18+
- npm / pnpm / yarn
- PostgreSQL & Redis for API (or use cloud services)

### Cài đặt

```bash
npm install --workspaces
```

### Chạy Web (Nuxt 4)

```bash
cd apps/web
npm run dev
```

### Chạy API (NestJS)

```bash
cd apps/api
npm run dev
```

## Tài liệu

- Tài liệu API: `apps/api/docs`
- Tài liệu Web: `apps/web/docs`
- Tính năng & lộ trình: `docs/FEATURES_AND_ROADMAP.md`
- Triển khai: `docs/DEPLOYMENT.md`

## Triển khai

- Docker (khuyến nghị): `docker-compose.yml`
- Nginx reverse proxy: `deploy/nginx/fresh_shop.conf`
- PM2 (non-Docker): `deploy/pm2/ecosystem.config.cjs`

## Giấy phép

UNLICENSED
