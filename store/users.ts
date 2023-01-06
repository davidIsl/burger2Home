import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { store } from '.';
import { UserCurrent } from '~/utils/utils';
// import { API } from '~/utils/javaBack';

@Module({
  name: 'users',
  namespaced: true,
  stateFactory: true,
  store,
})
export default class Users extends VuexModule {
  // basket: Basket | {} = {};
  currentUser: UserCurrent | null = null;

  @Mutation
  setCurrentUser(user: UserCurrent) {
    this.currentUser = user;
  }

  @Mutation
  resetUser() {
    this.currentUser = null;
    console.log('USERS', this.currentUser);
  }
}
