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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
     sass: [],
     scss: ['~/assets/scss/utilities.scss'],
     less: [],
     stylus: [],
     hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false}],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/'
    proxy: true
  },

  proxy: {
    // Simple proxy with options
    '/a5-vlvz-api': {
    target: 'https://hfph.academyfive.net/connect/data.php?view=142&token=8526-11BD-4B02-365E-8DD7-D025-5A4C-C0EC&key=15FE-9E19-377E-1CAA-2E67-D9B8-4EAE-B866&format=json&format=json&x=y',
      changeOrigin: true
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
