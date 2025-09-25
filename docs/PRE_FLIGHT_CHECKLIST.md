# Pre‑Flight Deployment Checklist

## Security & Networking

- TLS certificates valid and auto‑renew (Let’s Encrypt)
- CORS_ORIGIN set to production domains
- HSTS enabled at Nginx
- Helmet, rate‑limit, compression active (API)

## Environment & Secrets

- API: DATABASE_URL, Redis, JWT secrets set
- Web: API_BASE_URL points to API gateway
- ENABLE_SWAGGER off in prod (or gated)

## Database & Data

- Migrations run on production DB
- Backups configured and tested restore
- Read/write connectivity verified

## Observability

- Logs shipped (stdout/JSON) to your log store
- Error tracking (Sentry) configured
- Uptime/health checks enabled

## Scaling & Performance

- API stateless, multiple replicas OK
- DB connection pool sized appropriately
- CDN for static assets if applicable

## Smoke Tests

- /api/v1/health returns ok
- Auth login/register flow tested
- Products list/detail, cart add/update/remove OK

## Rollback Plan

- Previous image/tag available
- DB rollback strategy documented
