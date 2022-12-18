import { Basket, BasketLine, Product } from '~/utils/utils';

export const state = () => ({
  basketLine: [],
  totalPrice: 0,
  quantity: 0,
});

export const mutations = {
  setBasket(state: any, basket: Basket) {
    state.basketLine = basket.basketLines;
    state.totalPrice = basket.basketLines;
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
