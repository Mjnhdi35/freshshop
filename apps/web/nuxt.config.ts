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
        { name: "description", content: "Modern e-commerce platform" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
