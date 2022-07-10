export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      //{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' }
    ],
    script: [
      //{ src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', type: 'text/javascript'}
      { src: '/bootstrap.bundle.min.js', type: 'text/javascript' }
    ]
  },

  env: {
    testEnv: process.env.TEST_ENV || 0,
    nuxtEnvDevalueLogLimit: process.env.NUXT_ENV_DEVALUE_LOG_LIMIT || 0
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/custom.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bootstrap.js',
    '~/plugins/services.js',
    '~/plugins/interceptor.js',
    //{ src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', type: 'text/javascript' }
  ],

  router: {
    extendRoutes(routes, resolve) {
      //console.log(routes[5].children)
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    host: 'localhost',
    prefix: '/api/'
  },
  proxy: {
    '/api/': 'http://192.168.0.39:8081/'
  },
  server: {
    host: '0.0.0.0' // default: localhost
  }

  // use these settings to use custom css
  /*bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true,
  }*/
}
