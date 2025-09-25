# Setup Guide (Web)

## Prerequisites

- Node.js 18+

## Install

```bash
npm install
```

## Environment

- Copy `.env.example` to `.env` and adjust values.

```bash
cp .env.example .env
```

`.env` variables:

```
# Used by runtimeConfig.public.apiBase in nuxt.config.ts
API_BASE_URL=http://localhost:3000/api/v1
```

## Development

```bash
npm run dev
```

- App runs at `http://localhost:3000`

## Build & Preview

```bash
npm run build
npm run preview
```

## Notes

- Local mock endpoints are available under `app/server/api`
- To point the web to the NestJS API, set `API_BASE_URL` accordingly

## Deployment (Non‑Docker)

- Build with `npm run build`, then run with `node .output/server/index.mjs`
- PM2: see `deploy/pm2/ecosystem.config.cjs`
- Reverse proxy/TLS: see `deploy/nginx/fresh_shop.conf`
