export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MONI powered by TINCA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'MONI - Powered by TINCALAB SAS 2023. Ahorra tiempo y esfuerzo en la gestión de tu tienda en línea con nuestro potente administrador de productos, categorías y códigos de descuento, y mejora tu rentabilidad con nuestro sistema de órdenes de venta.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og-type', property: 'og:type', content: 'website' },
      { hid: 'og-title', property: 'og:title', content: 'MONI' },
      {
        hid: 'og-description',
        property: 'og:description',
        content:
          'Ahorra tiempo y esfuerzo en la gestión de tu tienda en línea con nuestro potente administrador de productos, categorías y códigos de descuento, y mejora tu rentabilidad con nuestro sistema de órdenes de venta.',
      },
      {
        hid: 'og-image',
        property: 'og:image',
        content: 'https://www.tincalab.com/icon.png',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'gestión de inventario, administración de productos, ventas en línea, optimización de ecommerce, análisis de datos, estrategias de marketing, gestión de precios, categorización de productos, imágenes de productos, gestión de pedidos, integración de tiendas en línea, automatización de procesos, aumento de rentabilidad, eficiencia en la gestión de ecommerce, experiencia de usuario (ux)',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/index.css", "~/assets/css/fonts.css"],

 // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/main.js",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  // Router module configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
  router: {
    middleware: ['auth'],
  },

  // Auth module configuration: https://auth.nuxtjs.org/guide/setup
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post' },
          logout: { url: '/api/v1/auth/logout', method: 'post' },
          user: { url: '/api/v1/auth/user', method: 'get' },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8080',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es',
    },
    icon: {
      fileName: 'icon.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
