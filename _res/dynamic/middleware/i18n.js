export default function ({ isHMR, app, store, route, error }) {
  const defaultLocale = app.i18n.fallbackLocale;
  const lang = route.path.split('/')[1];

  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }
  // Get locale from params
  const locale = lang || defaultLocale;
  if (!store.state.i18n.locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 });
  }
  // Set locale
  store.commit('i18n/setLang', locale);
  app.i18n.locale = store.state.i18n.locale;
}
