# Web Architecture (Nuxt 4)

## Overview

- Nuxt 4 app with Pinia for state and Nuxt UI for components
- Tailwind CSS v4 for styling
- Local server routes in `app/server/api` for mock product data

## Layers

- Pages (`app/pages`) → UI routes
- Components (`app/components`) → UI building blocks
- Stores (`app/stores`) → application state (products, cart, wishlist)
- Composables (`app/composables`) → shared logic (`useApi`, `useAuth`, etc.)
- Server (`app/server/api`) → internal API endpoints (mock)

## Data Flow

```
Page → Composable/Store → useApi/$fetch → (Local API or External API) → Response → Store → UI
```

## Runtime Config

- `runtimeConfig.public.apiBase` controls external API base URL
- When calling local routes, use `/api/...` directly

## Key Stores

- `products`: pagination, cache by id
- `cart`: localStorage persisted, totals
- `wishlist`: ids + product map persisted

## Auth (client-only baseline)

- `useAuth` manages user object in localStorage
- Calls `/auth/*` API endpoints and stores tokens locally

## Styling

- Tailwind v4 via `@nuxtjs/tailwindcss`
- Global CSS: `app/assets/css/main.css`

## Components

- `ui`: Button, Card, Alert, Modal, etc.
- `forms`: Form wrapper, SearchBar
- `product`: ProductCard, ProductGrid

## Routing

- Products listing: `pages/products/index.vue`
- Product detail: `pages/products/[id].vue`
- Cart: `pages/cart.vue`
- Auth: `pages/auth/login.vue`, `pages/auth/register.vue`
