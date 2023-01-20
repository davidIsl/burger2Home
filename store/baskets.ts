import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from '.';
import { BasketLine, formatDate, Product } from '~/utils/utils';
import { API } from '~/utils/javaBack';

@Module({
  name: 'baskets',
  namespaced: true,

  store,
})
export default class Baskets extends VuexModule {
  basketLine: BasketLine[] = [];
  totalPrice: number = 0;
  quantity: number = 0;
  amountToAdd: number = 1;

  get getBasketLine(): BasketLine[] {
    return this.basketLine;
  }

  @Mutation
  addBasket(basketLines: BasketLine[]) {
    this.basketLine = basketLines;
  }

  @Mutation
  addBasketLine({ product, quantity }: { product: Product; quantity: number }) {
    const existingBasketLine = this.basketLine.find(
      (line) => line.productId === product.id
    );

    if (existingBasketLine) {
      existingBasketLine.amount += quantity;
    } else {
      const item: BasketLine = {
        id: null,
        basketId: 1,
        productId: product.id,
        amount: quantity,
        product,
      };
      this.basketLine.push(item);
    }

    this.totalPrice += product.actualPrice * quantity;
    this.quantity += quantity;
    this.amountToAdd = 1;
  }

  @Mutation
  incrementAmount(productId: number) {
    const lineToIncrement = this.basketLine.find(
      (line) => line.productId === productId
    );

    if (lineToIncrement) {
      lineToIncrement.amount++;
      this.quantity++;
      this.totalPrice += lineToIncrement.product.actualPrice;
    }
  }

  @Mutation
  decrementAmount(productId: number) {
    const lineToDecrement = this.basketLine.find(
      (line) => line.productId === productId
    );

    if (lineToDecrement) {
      lineToDecrement.amount--;
      this.quantity--;
      this.totalPrice -= lineToDecrement.product.actualPrice;
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
    this.totalPrice -=
      (amountToRemove?.product.actualPrice as number) *
      (amountToRemove?.amount as number);
  }

  @Mutation
  resetBasket() {
    this.basketLine = [];
    this.quantity = 0;
    this.totalPrice = 0;
    this.amountToAdd = 1;
  }

  @Action({ rawError: true })
  async addProduct({ id, quantity }: { id: number; quantity: number }) {
    const response = await API.getProductSummaryById(id); // TODO BY LANG

    if (response.status !== 200) {
      return;
    }

    this.context.commit('addBasketLine', {
      product: response.data,
      quantity,
    });
  }

  @Action
  async getUserBasket(userId: number) {
    const response = await API.getBasketByUserId(userId);

    if (response.status !== 200) {
      return;
    }

    this.context.commit('addBasket', response.data.basketLines);
  }

  @Action({ rawError: true })
  async saveBasket(userId: number) {
    if (userId === null || userId === 0) {
      return;
    }

    const responseBasket = await API.getBasketByUserId(userId);

    if (responseBasket.status !== 200) {
      return;
    }

    const lastUpdated = formatDate(new Date().toString());

    const responseUpdateBasket = await API.updateBasket(
      responseBasket.data.id,
      lastUpdated,
      responseBasket.data.userId
    );

    if (responseUpdateBasket.status !== 200) {
      return;
    }

    const responseBasketLines = await API.getBasketLinesByBasketId(
      responseBasket.data.id
    );

    if (responseBasketLines.status !== 200) {
      return;
    }

    for (let i = 0; i < responseBasketLines.data.length; i++) {
      const responseRemoveExistingLines = await API.removeBasketLine(
        responseBasketLines.data[i].id as number
      );
      if (responseRemoveExistingLines.status !== 200) {
        return;
      }
    }

    for (let i = 0; i < (this.context.state as any).basketLine.length; i++) {
      const responseCreateBasketLine = await API.addBasketLine(
        responseBasket.data.id,
        (this.context.state as any).basketLine[i].productId,
        (this.context.state as any).basketLine[i].amount
      );

      if (responseCreateBasketLine.status !== 200) {
        return;
      }
    }
  }
}
