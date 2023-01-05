import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from '.';
import { BasketLine } from '~/utils/utils';
import { API } from '~/utils/javaBack';

@Module({
  name: 'basket',
  namespaced: true,
  stateFactory: true,
  store,
})
export default class Baskets extends VuexModule {
  // basket: Basket | {} = {};
  basketLine: BasketLine[] = [];
  totalPrice: number = 0;
  quantity: number = 0;

  @Mutation
  setBasket() {}

  @Action
  async addProduct(id: number) {
    // this.basketLine.forEach((item) => ({
    //   if(item.productId === id) {
    //     this.quantity++;
    //   }

    //   id: item.productId,
    // }));

    for (let i = 0; i < this.basketLine.length; i++) {
      if (this.basketLine[i].productId === id) {
        this.quantity++;
      } else {
        const response = await API.getProductById(id);

        if (response.status !== 200) {
          return;
        }

        const item: BasketLine = {
          basketId: 1,
          productId: response.data.id,
          amount: 1,
        };
        this.basketLine.push(item);
      }
    }
  }

  // removeProduct(productId: number) {}

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  resetBasket() {
    // this.basket = {};
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
