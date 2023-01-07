import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from '.';
import { BasketLine, Product } from '~/utils/utils';
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
  amountToAdd: number = 1;

  @Mutation
  addBasketLine(product: Product) {
    console.log('PRoducut', product);

    const existingBasketLine = this.basketLine.find(
      (line) => line.productId === product.id
    );
    console.log('LINE', existingBasketLine);

    if (existingBasketLine) {
      existingBasketLine.amount += this.amountToAdd;
      console.log('SAME ID');
    } else {
      const item: BasketLine = {
        id: null,
        basketId: 1,
        productId: product.id,
        amount: this.amountToAdd,
        product,
      };
      this.basketLine.push(item);
      console.log('OTHER ID', item);
    }

    this.quantity += this.amountToAdd;
    this.amountToAdd = 1;
    // this.context.dispatch('getProduct', productId);
    // this.basketLine
    console.log('QUANTITY', this.quantity);
    console.log('BasketLine', this.basketLine);
  }

  // @Mutation
  // addProduct(product: Product) {

  // }

  @Mutation
  incrementAmount(productId: number) {
    const lineToIncrement = this.basketLine.find(
      (line) => line.productId === productId
    );
    console.log('BL', lineToIncrement);

    if (lineToIncrement) {
      lineToIncrement.amount++;
      this.quantity++;
    }
  }

  @Mutation
  decrementAmount(productId: number) {
    const lineToDecrement = this.basketLine.find(
      (line) => line.productId === productId
    );
    console.log('BL', lineToDecrement);

    if (lineToDecrement) {
      lineToDecrement.amount--;
      this.quantity--;
    }
  }

  @Mutation
  incrementAmountToAdd() {
    this.amountToAdd++;
  }

  @Mutation
  decrementAmountToAdd() {
    if (this.amountToAdd === 0) {
      return;
    }
    this.amountToAdd--;
  }

  @Mutation
  removeBasketLine(productId: number) {
    console.log('PRODUCTID', productId);
    const index = this.basketLine.findIndex(
      (line) => line.productId === productId
    );
    const amountToRemove = this.basketLine.find(
      (line) => line.productId === productId
    );

    if (index !== -1) {
      this.basketLine.splice(index, 1);
    }
    this.quantity -= amountToRemove?.amount as number;
    console.log('BL REMOVE', this.basketLine);
    // }
  }

  @Action
  async addProduct(id: number) {
    const response = await API.getProductSummaryById(id); // TODO BY LANG

    if (response.status !== 200) {
      return;
    }

    this.context.commit('addBasketLine', response.data);
    console.log('END ACTION');
  }

  // removeProduct(productId: number) {}

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  @Mutation
  resetBasket() {
    // this.basket = {};
    this.basketLine = [];
    this.quantity = 0;
    this.totalPrice = 0;
    this.amountToAdd = 1;
  }
}
