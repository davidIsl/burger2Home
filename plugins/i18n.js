import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n, {
  seo: false,
});

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'en',
    messages: {
      fr: require('~/i18n/fr.json'),
      en: require('~/i18n/en.json'),
    },
  });

  app.i18n.path = function (link) {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
