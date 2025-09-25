# Components Catalog

## UI

- `ui/Button.vue` — unified button with loading/leading/trailing icons
- `ui/Card.vue` — card container with header/footer slots
- `ui/Alert.vue` — alerts (variants, sizes)
- `ui/Modal.vue` — modal with header/footer and confirm/cancel
- `ui/Badge.vue` — badge with variants and sizes
- `ui/Breadcrumb.vue` — breadcrumb navigation
- `ui/LoadingSpinner.vue` — spinner with sizes/colors

## Layout

- `layout/Header.vue` — top nav, search, user menu
- `layout/Footer.vue` — footer links, contacts

## Forms

- `forms/Form.vue` — form wrapper with actions bar
- `forms/SearchBar.vue` — debounced search with suggestions/recent

## Product

- `product/ProductCard.vue` — product tile with wishlist/add-to-cart
- `product/ProductGrid.vue` — responsive grid with load more

## Usage Tips

- All components use Nuxt UI primitives underneath
- Prefer emitting events (e.g., `addToCart`) and handle them in pages
