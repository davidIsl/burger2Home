import { Basket } from '~/utils/utils';

export const state = () => ({
  products: [],
  totalPrice: 0,
  quantity: 0,
});

export const mutations = {
  setBasket(state: any, basket: Basket) {
    state.products = basket.products;
    state.price = basket.totalPrice;
  },

  resetBasket(state: any) {
    state.products = [];
    state.totalPrice = 0;
    state.quantity = 0;
  },

  increment(state: any) {
    state.quantity++;
  },

  decrement(state: any) {
    state.quantity--;
  },
};
