# Features & Roadmap

## Implemented Features

### API (NestJS)

- Authentication: JWT access + refresh tokens, HttpOnly cookies
- Role-based access (admin/customer), global JWT guard, @Public decorator
- Users: profile, update, role management
- Products: CRUD, featured, pagination, filtering
- Categories: CRUD
- Cart: add/update/remove/clear, totals
- Posts: CRUD, featured, published listing, view count
- Entities: TypeORM, lazy-loading relations
- Security: validation pipe, exception filtering, response interceptor
- Infra: PostgreSQL, Upstash Redis, config-driven
- Production: Helmet, compression, rate limit, CORS env, Swagger (optional), health endpoint

### Web (Nuxt 4)

- Nuxt UI components, Tailwind v4 styling
- Product listing/grid, detail, cart page, wishlist
- Auth pages (login/register) wiring via composables
- Pinia stores for products, cart, wishlist; composables for API/auth
- Runtime config `API_BASE_URL`
- Dockerized build/run

## Roadmap

- Payments integration (Stripe)
- Image upload & CDN (S3/Cloudflare R2)
- Admin dashboard (Nuxt) for content/products/orders
- Search improvements (full-text, filters, sort)
- Email/notifications (transactional emails)
- Observability (Sentry, Grafana/Prometheus, log shipping)
- i18n for web app
- E2E tests and CI/CD pipeline
