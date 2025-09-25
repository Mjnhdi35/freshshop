// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
  ],

  // Auto-import components without directory prefix in names
  components: {
    dirs: [{ path: "~/components", pathPrefix: false }],
  },

  // API Configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:4000/api/v1",
    },
  },

  // UI Configuration
  ui: {
    global: true,
    icons: ["heroicons"],
  },

  // Color mode configuration
  colorMode: {
    preference: "light",
    fallback: "light",
    hid: "nuxt-color-mode-script",
  },

  // CSS
  css: ["@/assets/css/main.css"],

  // Source directory
  srcDir: "app/",

  // App configuration
  app: {
    head: {
      title: "Fresh Shop",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Nền tảng thương mại điện tử hiện đại",
        },
        { name: "theme-color", content: "#0ea5e9" },
        { name: "robots", content: "index,follow" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Fresh Shop" },
      ],
      htmlAttrs: { lang: "vi" },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },
  nitro: {
    routeRules: {
      "/": { swr: 60 },
      "/products": { swr: 60 },
      "/products/**": { swr: 60 },
      "/api/**": { cache: false },
    },
  },
});
