import config from './config.json';

// Server config
const server = {
  host: config[process.env.NODE_ENV].host,
  port: config[process.env.NODE_ENV].port,
};

// SSL Config
if (config[process.env.NODE_ENV].certificate) {
  server.https = {
    key: fs.readFileSync(
      `${config[process.env.NODE_ENV].certificate}privkey.pem`
    ),
    cert: fs.readFileSync(
      `${config[process.env.NODE_ENV].certificate}cert.pem`
    ),
    ca: fs.readFileSync(
      `${config[process.env.NODE_ENV].certificate}fullchain.pem`
    ),
  };
}

// Environment of the project
process.env.URL = config[process.env.NODE_ENV].url;
process.env.API_URL = config[process.env.NODE_ENV].api_url;
process.env.NAMESPACE = config[process.env.NODE_ENV].namespace;
process.env.ENGINE = config[process.env.NODE_ENV].engine;

export default {
  // Environment of the project
  env: {
    URL: config[process.env.NODE_ENV].url,
    API_URL: config[process.env.NODE_ENV].api_url,
    NAMESPACE: config[process.env.NODE_ENV].namespace,
    ENGINE: config[process.env.NODE_ENV].engine,
    NODE_ENV: process.env.NODE_ENV,
  },

  // Headers of the page: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Burger2Home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Burger2Home',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-burger-test.png' },
    ],
    script: [
      {
        // pathseg.js is used for particles on svg
        src: 'js/particles/pathseg.js',
      },
    ],
  },

  // Server settings: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
  server,

  // Router of the project: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router/
  router: {
    base: config[process.env.NODE_ENV].base,
    middleware: ['i18n', 'baskets'],
    trailingSlash: true,
  },

  // Nuxt target: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target
  target: 'server',

  // https://nuxtjs.org/docs/2.x/features/rendering-modes
  ssr: true,

  render: {
    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#http2
    // http2: {
    //   push: true,
    //   pushAssets: (publicPath, preloadFiles) =>
    //     preloadFiles
    //       .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
    //       .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    // },

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#compressorhttps://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#compressor
    // https://www.npmjs.com/package/compression
    compressor: { threshold: -1 },

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#asyncscripts
    asyncScripts: false,

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#injectscripts
    injectScripts: true,

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#resourcehints
    resourceHints: false,

    // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-render#crossorigin
    crossorigin: 'undefined',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    // https://color-mode.nuxtjs.org/
    '@/assets/css/color-mode-themes.css',
    'vue-slick-carousel/dist/vue-slick-carousel.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // https://analytics.google.com/
    // { mode: 'client', src: '@plugins/ga.js' },
    // Init AXIOS
    { mode: 'all', src: '@/plugins/initAPI.js' },
    // https://github.com/kazupon/vue-i18n#readme
    { mode: 'all', src: '@/plugins/i18n.js' },
    // https://github.com/michalsnik/aos
    { mode: 'client', src: '@/plugins/aos.js' },
    // https://vue-multiselect.js.org/
    { mode: 'all', src: '@plugins/vue-multiselect.js' },
    // https://www.npmjs.com/package/vue2-datepicker
    { mode: 'all', src: '@plugins/vue2-datepicker.js' },
    // https://www.npmjs.com/package/vuex-persist
    { mode: 'client', src: '@/plugins/vuex-persist.js' },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Nuxt.js Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // https://gitlab.com/broj42/nuxt-gmaps#readme
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyBdIW6m6S2AzXBInrWgzlOCcyqLUd4LC5I',
      },
    ],
  ],

  // Customize the progress-bar color
  loading: { color: '#7479f3' },

  // ColorMode module configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'AntelopeJS Nuxt Bootstrap Template', // maximum of 45 characters
      short_name: 'AntelopeJSNBS', // maximum of 12 characters
      dir: 'ltr',
      lang: 'fr',
      theme_color: '#7479f3',
    },
  },

  // Sweetalert module configuration
  sweetalert: {
    // confirmButtonColor: '#7479f3',
    // cancelButtonColor: '#6c757d',
  },

  // Fontawesome module configuration
  fontawesome: {
    icons: {
      solid: [
        'faCheckSquare',
        'faCheckCircle',
        'faExclamationTriangle',
        'faAngleDoubleUp',
        'faEdit',
        'faTrash',
        'faSearch',
        'faFilePdf',
        'faShoppingBasket',
        'faMinus',
        'faPlus',
        'faTag',
        'faEye',
        'faEyeSlash',
        'faCamera',
        'faPencilAlt',
        // 'fasBasketShopping',
      ],
      regular: [],
      brands: ['faFacebook', 'faGoogle', 'faGithub'],
    },
  },

  // Bootstrap-vue module configuration : https://bootstrap-vue.org/docs
  bootstrapVue: {
    config: {
      breakpoints: [`xs`, 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: false,
    components: [
      // https://bootstrap-vue.org/docs/components/layout
      'BContainer',
      'BRow',
      'BCol',
      // 'BFormRow',
      // https://bootstrap-vue.org/docs/components/alert
      'BAlert',
      // https://bootstrap-vue.org/docs/components/avatar
      'BAvatar',
      'BAvatarGroup',
      // https://bootstrap-vue.org/docs/components/badge
      'BBadge',
      // https://bootstrap-vue.org/docs/components/button
      'BButton',
      'BButtonGroup',
      // https://bootstrap-vue.org/docs/components/breadcrumb
      'BBreadcrumb',
      'BBreadcrumbItem',
      // https://bootstrap-vue.org/docs/components/collapse
      'BCollapse',
      // https://bootstrap-vue.org/docs/components/nav
      // https://bootstrap-vue.org/docs/components/navbar
      'BNav',
      'BNavItem',
      'BNavbar',
      'BNavbarNav',
      'BNavbarBrand',
      'BNavbarToggle',
      'BNavItemDropdown',
      'BDropdownItem',
      // https://bootstrap-vue.org/docs/components/calendar
      'BCalendar',
      // https://bootstrap-vue.org/docs/components/card
      'BCard',
      'BCardHeader',
      'BCardFooter',
      'BCardBody',
      'BCardTitle',
      'BCardSubTitle',
      'BCardImg',
      'BCardImgLazy',
      'BCardText',
      'BCardGroup',
      // https://bootstrap-vue.org/docs/components/carousel
      'BCarousel',
      'BCarouselSlide',
      // https://bootstrap-vue.org/docs/components/collapse
      'BCollapse',
      // https://bootstrap-vue.org/docs/components/dropdown
      'BDropdown',
      'BDropdownItem',
      // 'BDropdownItemButton',
      // 'BDropdownDivider',
      // 'BDropdownForm',
      // 'BDropdownText',
      // 'BDropdownGroup',
      // 'BDropdownHeader',
      // https://bootstrap-vue.org/docs/components/embed
      'BEmbed',
      // https://bootstrap-vue.org/docs/components/form
      'BForm',
      // 'BFormText',
      // 'BFormInvalidFeedback',
      // 'BFormValidFeedback',
      // 'BFormDatalist',
      // https://bootstrap-vue.org/docs/components/form-checkbox
      // 'BFormCheckboxGroup',
      'BFormCheckbox',
      // https://bootstrap-vue.org/docs/components/form-datepicker
      // 'BFormDatepicker',
      // https://bootstrap-vue.org/docs/components/form-file
      // 'BFormFile',
      // https://bootstrap-vue.org/docs/components/form-group
      'BFormGroup',
      // https://bootstrap-vue.org/docs/components/form-input
      'BFormInput',
      // https://bootstrap-vue.org/docs/components/form-radio
      // 'BFormRadioGroup',
      // 'BFormRadio',
      // https://bootstrap-vue.org/docs/components/form-rating
      // 'BFormRating',
      // https://bootstrap-vue.org/docs/components/form-select
      'BFormSelect',
      // 'BFormSelectOption',
      // 'BFormSelectOptionGroup',
      // https://bootstrap-vue.org/docs/components/form-spinbutton
      // 'BFormSpinbutton',
      // https://bootstrap-vue.org/docs/components/form-tags
      // 'BFormTags',
      // 'BFormTag',
      // https://bootstrap-vue.org/docs/components/form-textarea
      'BFormTextarea',
      // https://bootstrap-vue.org/docs/components/form-timepicker
      // 'BFormTimepicker',
      'BInputGroup',
      // https://bootstrap-vue.org/docs/components/image
      'BImg',
      'BImgLazy',
      // https://bootstrap-vue.org/docs/components/jumbotron
      'BJumbotron',
      // https://bootstrap-vue.org/docs/components/list-group
      'BListGroup',
      'BListGroupItem',
      // https://bootstrap-vue.org/docs/components/modal
      'BModal',
      // https://bootstrap-vue.org/docs/components/overlay
      'BOverlay',
      // https://bootstrap-vue.org/docs/components/pagination
      'BPagination',
      // https://bootstrap-vue.org/docs/components/popover
      'BPopover',
      // https://bootstrap-vue.org/docs/components/progress
      'BProgress',
      'BProgressBar',
      // https://bootstrap-vue.org/docs/components/sidebar
      'BSidebar',
      // https://bootstrap-vue.org/docs/components/skeleton
      'BSkeleton',
      // 'BSkeletonWrapper',
      // 'BSkeletonTable',
      // 'BSkeletonImg',
      // 'BSkeletonIcon',
      // https://bootstrap-vue.org/docs/components/spinner
      'BSpinner',
      // https://bootstrap-vue.org/docs/components/tabs
      'BTab',
      'BTabs',
      // https://bootstrap-vue.org/docs/components/table
      'BTable',
      // 'BTableLite',
      // 'BTableSimple',
      // 'BTbody',
      // 'BThead',
      // 'BTfoot',
      // 'BTr',
      // 'BTd',
      // 'BTh',
      // https://bootstrap-vue.org/docs/components/toast
      'BToast',
      'BToaster',
    ],
    componentPlugins: ['ToastPlugin'],
    directives: ['VBToggle', 'VBModal'],
    directivePlugins: [],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    headers: {
      common: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    parallel: false,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    optimizeCSS: true,
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 200000,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    minimize: true,
    babel: {
      compact: true,
    },
    transpile: ['vuelidate-property-decorators'],
  },
};
