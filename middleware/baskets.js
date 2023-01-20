import { API } from '~/utils/javaBack';

export default async function ({ store }) {
  console.log('OUT CONDITION');
  if (
    process.client &&
    store._modules.root.context.state.users.currentUser !== null
  ) {
    console.log('STORE', store);
    console.log(
      'USERS STORE ',
      store._modules.root.context.state.users.currentUser.id
    );
    const responseBasket = await API.getBasketByUserId(
      store._modules.root.context.state.users.currentUser.id
    );

    if (responseBasket.status !== 200) {
      return;
    }
    console.log('LENGTH', responseBasket.data.basketLines.length);
    console.log('BASKETLINES MIDDLEWARRE', responseBasket.data.basketLines);
    store.commit('baskets/resetBasket');
    for (let i = 0; i < responseBasket.data.basketLines.length; i++) {
      console.log('INDEX', i);
      console.log('PRODUCT LOOP', responseBasket.data.basketLines[i].productId);
      const responseProduct = await API.getProductSummaryById(
        responseBasket.data.basketLines[i].productId
      );

      if (responseProduct.status !== 200) {
        return;
      }
      console.log('AMOUNT', responseBasket.data.basketLines[i].amount);

      console.log('ID', responseProduct.data.id);
      store.dispatch('baskets/addProduct', {
        id: responseProduct.data.id,
        quantity: responseBasket.data.basketLines[i].amount,
      });
    }
    // store.dispatch('baskets/saveBasket');
    console.log('MIDDLEWARE END');
    // }
  }
}
