// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
        "@pinia/nuxt",
  ],
  css: ["bootstrap/dist/css/bootstrap.min.css"],

  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },

  compatibilityDate: "2024-10-03",
});