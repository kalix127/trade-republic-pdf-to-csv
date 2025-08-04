import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/scripts",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "nuxt-umami",
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "Ui",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    preference: "system",
    classPrefix: "",
    classSuffix: "",
    storage: "cookie",
    storageKey: "color-theme",
    fallback: "light",
  },
  i18n: {
    defaultLocale: "it",
    locales: ["it", "en"],
    strategy: "no_prefix",
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  watch: [
    "~/i18n/**/*",
    "~/assets/**/*",
    "~/components/**/*",
    "~/layouts/**/*",
    "~/pages/**/*",
    "~/plugins/**/*",
    "~/server/**/*",
    "~/middleware/**/*",
    "~/app.config.ts",
    "~/nuxt.config.ts",
  ],
  nitro: {
    devServer: {
      watch: ["i18n/**/*"],
    },
  },
  umami: {
    id: "dd07e5a9-d983-4599-9d42-6f3c1e216e72",
    host: "https://cloud.umami.is",
    autoTrack: true,
    logErrors: true,
    useDirective: true,
    ignoreLocalhost: true,
  },
});
