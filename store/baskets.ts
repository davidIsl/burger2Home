import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from '.';
import { Basket, BasketLine } from '~/utils/utils';

@Module({
  name: 'basket',
  namespaced: true,
  stateFactory: true,
  store,
})
export default class Baskets extends VuexModule {
  basket: Basket | {} = {};
  basketLine: BasketLine[] = [];
  totalPrice: number = 0;
  quantity: number = 0;

  @Mutation
  setBasket(basket: Basket) {
    this.basket = basket;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  resetBasket() {
    this.basket = {};
    this.basketLine = [];
    this.quantity = 0;
    this.totalPrice = 0;
  }
}
// export const state = () => ({
//   basketLine: [],
//   totalPrice: 0,
//   quantity: 0,
// });

// export const mutations = {
//   setBasket(state: any, basket: Basket) {
//     state.basketLine = basket.basketLines;
//     state.totalPrice = basket.basketLines;
//   },

//   resetBasket(state: any) {
//     state.products = [];
//     state.totalPrice = 0;
//     state.quantity = 0;
//   },

//   increment(state: any) {
//     state.quantity++;
//   },

//   decrement(state: any) {
//     state.quantity--;
//   },
// };
