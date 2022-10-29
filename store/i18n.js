export const state = () => ({
  locales: ['fr', 'en', 'es'],
  locale: 'fr',
});

export const mutations = {
  setLang(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
  },
};
