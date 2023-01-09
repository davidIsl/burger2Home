import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { store } from '.';
import { UserCurrent } from '~/utils/utils';
import { API } from '~/utils/javaBack';
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

  @Action
  async getUser() {
    const response = await API.getUserById(1);

    if (response.status !== 200) {
      return;
    }

    this.context.commit('setCurrentUser', response.data);
  }

  getRole() {
    if (this.currentUser !== null) {
      return this.currentUser.role.name;
    }
  }
}
