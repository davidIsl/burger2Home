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
  // basket: Basket | {} = {};
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
    console.log('PRoducut', product);
    console.log('AMOUNTTOADD BASKTLINEADD', this.amountToAdd);

    const existingBasketLine = this.basketLine.find(
      (line) => line.productId === product.id
    );
    console.log('LINE', existingBasketLine);

    if (existingBasketLine) {
      existingBasketLine.amount += quantity;
      console.log('SAME ID');
    } else {
      const item: BasketLine = {
        id: null,
        basketId: 1,
        productId: product.id,
        amount: quantity,
        product,
      };
      this.basketLine.push(item);
      console.log('OTHER ID', item);
    }

    this.quantity += quantity;
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

  @Mutation
  resetBasket() {
    // this.basket = {};
    this.basketLine = [];
    this.quantity = 0;
    this.totalPrice = 0;
    this.amountToAdd = 1;
  }

  @Action({ rawError: true })
  async addProduct({ id, quantity }: { id: number; quantity: number }) {
    console.log('ID STORE PRODUCT', id);

    const response = await API.getProductSummaryById(id); // TODO BY LANG

    if (response.status !== 200) {
      return;
    }

    this.context.commit('addBasketLine', {
      product: response.data,
      quantity,
    });
    // this.context.dispatch('saveBasket');
    // setTimeout(() => {
    //   this.submitProductAdd = submitProductAddType.NONE;
    //   this.errorMsg = '';
    // }, 3000);
    // this.context.dispatch('saveBasket');
    // console.log('BASKET SAVED');

    // const responseAddProduct = await API.addBasketLine(
    //   (this.context.state as any).basketLine[0].basketId,
    //   id,
    //   (this.context.state as any).amountToAdd
    // );

    // if (responseAddProduct.status !== 200) {
    //   return;
    // }

    console.log('END ACTION');
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
    console.log('MIDDLEWARE SAVE');
    if (userId === null || userId === 0) {
      console.log('PAS CONNECTE');

      return;
    }
    console.log('user ID', userId);
    console.log('BASKET ID', this.context.state as any);

    const responseBasket = await API.getBasketByUserId(userId);

    if (responseBasket.status !== 200) {
      return;
    }

    const lastUpdated = formatDate(new Date().toString());
    console.log('STORE BL:', (this.context.state as any).basketLine);

    // const basketLines: any = this.$store.state.baskets.basketLine.map(
    //   (line: any) => ({
    //     id: line.id,
    //     basketId: line.basketId,
    //     productId: line.productId,
    //     amount: line.amount,
    //   })
    // );

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

    console.log('LINES', responseBasketLines.data);
    console.log('LINES STORE', (this.context.state as any).basketLine);

    // for (const storeLine of (this.context.state as any).basketLine) {
    //   console.log('STORE LINE', storeLine);
    //   if (responseBasketLines.data.length === 0) {
    //     const responseAddBasketLine = await API.addBasketLine(
    //       responseBasket.data.id,
    //       storeLine.productId,
    //       storeLine.amount
    //     );
    //     if (responseAddBasketLine.status !== 200) {
    //       return;
    //     }
    //   }
    //   for (const line of responseBasketLines.data) {
    //     console.log('LINE', line);
    //     if (
    //       line.productId === storeLine.productId &&
    //       line.amount !== storeLine.amount
    //     ) {
    //       console.log('SAME PRODUCT BUT NOT SAME QUANTIYY');
    //       const responseUpdate = await API.updateBasketLine(
    //         line.id as number,
    //         line.basketId,
    //         line.productId,
    //         storeLine.amount
    //       );

    //       if (responseUpdate.status !== 200) {
    //         return;
    //       }
    //     }
    //   }
    // }

    for (let i = 0; i < responseBasketLines.data.length; i++) {
      const responseRemoveExistingLines = await API.removeBasketLine(
        responseBasketLines.data[i].id as number
      );
      if (responseRemoveExistingLines.status !== 200) {
        return;
      }
      // for (let j = 0; j < (this.context.state as any).basketLine.length; j++) {
      //   // SAME PRODUCT BUT DIFF AMOUNT
      //   if (
      //     responseBasketLines.data[i].productId ===
      //       (this.context.state as any).basketLine[j].productId &&
      //     responseBasketLines.data[i].amount !==
      //       (this.context.state as any).basketLine[j].amount
      //   ) {
      //     const responseUpdate = await API.updateBasketLine(
      //       responseBasketLines.data[i].id as number,
      //       responseBasketLines.data[i].basketId,
      //       responseBasketLines.data[i].productId,
      //       (this.context.state as any).basketLine[j].amount
      //     );

      //     if (responseUpdate.status !== 200) {
      //       return;
      //     }
      //   }
      // }
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
    console.log('UPDATED BASKET OK');
  }
}
