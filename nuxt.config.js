export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HFPH',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vorlesungsverzeichnis der Hochschule für Philosophie München' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/helpers', ssr: false }, // datepicker plugin here
  ],

  devServerHandlers: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome',
  ],

  styleResources: {
    sass: [],
    scss: ['~/assets/scss/utilities.scss'],
    less: [],
    stylus: [],
    hoistUseStatements: true // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  fontawesome: {
    icons: {
      solid: true,
      regular: true,
      light: false,
      duotone: false,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dayjs',
  ],

  dayjs: {
    locales: ['de'],
    defaultLocale: 'de',
    defaultTimeZone: 'Europe/Berlin',
    plugins: [
      'updateLocale',
      'utc',
      'timezone',
      'duration',
      'isBetween',
      'isToday',
      'isTomorrow',
      'isYesterday',
      'relativeTime',
      'calendar'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/'
    proxy: true
  },

  proxy: {
    // Simple proxy with options
    '/a5-vlvz-api': {
    // `&x=y` am Ende, sonst kein JSON sondern HTML
    target: 'https://hfph.academyfive.net/connect/data.php?view=142&token=8526-11BD-4B02-365E-8DD7-D025-5A4C-C0EC&key=15FE-9E19-377E-1CAA-2E67-D9B8-4EAE-B866&format=json&format=json&x=y',
      changeOrigin: true
    },
    '/a5-rp-api': {
    // `&x=y` am Ende, sonst kein JSON sondern HTML
    target: 'https://hfph.academyfive.net/connect/data.php?view=44&token=89CB-2275-E2A6-1467-5996-4C76-B540-C6AA&key=2660-08F0-CCAD-99BA-8F7B-67D9-6230-7F53&format=json&x=y',
      changeOrigin: true
    },
    '/a5-modul-hb-api': {
    // `&x=y` am Ende, sonst kein JSON sondern HTML
    target: 'https://hfph.academyfive.net/connect/data.php?view=14046&token=2DF2-0607-3F3A-163F-E6DA-580A-7428-A70B&key=473C-B186-1289-D1CC-3C47-9113-E611-15D0&format=json&x=y',
      changeOrigin: true
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
