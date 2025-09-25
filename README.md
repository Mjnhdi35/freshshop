# Fresh Shop Monorepo

Monorepo thương mại điện tử hiện đại gồm API (NestJS) và Web (Nuxt 4).

## Cấu trúc

- `apps/api` — NestJS 11, TypeORM, PostgreSQL, Redis
- `apps/web` — Nuxt 4, Pinia, Nuxt UI, Tailwind CSS

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
