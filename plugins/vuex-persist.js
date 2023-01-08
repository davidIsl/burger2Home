import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: window.sessionStorage,
      key: 'burger2Home',
      reducer: (state) => ({
        // user: {
        //   user: state.user.user,
        //   lastSeenProducts: state.user.lastSeenProducts,
        // },
        // order: state.order,
        // stripe: { paymentId: state.stripe.paymentId },
        baskets: state.baskets,
      }),
    }).plugin(store);
  });
};
