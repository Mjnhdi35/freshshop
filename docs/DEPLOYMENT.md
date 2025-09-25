# Deployment Guide

## Docker (Recommended)

```bash
# Build and start
docker compose up --build -d

# Check services
curl http://localhost:3000/api/v1/health
```

- API: http://localhost:3000
- Web: http://localhost:3001

Set required env vars in your shell or `.env` file (compose uses them).

## PM2 (Non-Docker)

1. Build API and Web

```bash
# API
cd apps/api && npm install && npm run build
# Web
cd ../../apps/web && npm install && npm run build
```

2. Start with PM2

```bash
cd ../../
pm2 start deploy/pm2/ecosystem.config.cjs
pm2 save
```

Ensure production env vars are exported before starting PM2.

## Nginx Reverse Proxy + TLS

- Config: `deploy/nginx/fresh_shop.conf`
- Replace `yourdomain.com` and certificate paths
- Point web to port 3001, API to 3000 on the same host

## Environment Variables

See `docs/env/api.env.example.txt` and `docs/env/web.env.example.txt` for reference values. Rename to `.env` in production usage.
