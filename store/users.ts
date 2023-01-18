import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from '.';
import { UserCurrent } from '~/utils/utils';
import { API } from '~/utils/javaBack';

@Module({
  name: 'users',
  namespaced: true,
  stateFactory: true,
  store,
})
export default class Users extends VuexModule {
  currentUser: UserCurrent | null = null;
  basketId: number = 0;

  @Mutation
  setCurrentUser(user: UserCurrent) {
    this.currentUser = user;
    // console.log('USER', this.currentUser);
    // console.log('ROLE', this.getRole());
  }

  @Mutation
  resetUser() {
    console.log('USERS', this.currentUser);
    this.currentUser = null;
    console.log('USERS AFTER RESET', this.currentUser);
  }

  @Mutation
  setBasketId(basketId: number) {
    this.basketId = basketId;
  }

  @Action
  async getUser(userId: number) {
    const response = await API.getUserById(userId);

    if (response.status !== 200) {
      return;
    }

    const responseBasket = await API.getBasketByUserId(userId);

    if (responseBasket.status !== 200) {
      return;
    }
    console.log('BASKET', responseBasket.data);

    this.context.commit('setCurrentUser', response.data);
    this.context.commit('setBasketId', responseBasket.data.id);
    // this.context.dispatch('baskets/getUserBasket', this.currentUser.id);
  }

  // @Watch('currentUser')
  // getUserBasket() {}

  // @Action
  // async getUserBasketId() {
  //   if (this.currentUser !== null) {
  //     const response = await API.getBasketByUserId(this.currentUser.id);

  //     if (response.status !== 200) {
  //       return;
  //     }

  //     this.context.commit('setBasketId', response.data.id);
  //   }
  // }

  getRole() {
    if (this.currentUser !== null) {
      return this.currentUser.role.name;
    }
  }
}
