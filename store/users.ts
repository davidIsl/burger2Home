import { User } from '~/utils/utils';

export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state: any, user: User) {
    state.user = user;
  },

  getUser(state: any): User {
    return state.user;
  },

  // getPermissions(state: any) {
  //   return state.user
  // }
};
