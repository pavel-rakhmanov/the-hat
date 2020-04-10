import Vue from "vue"
import Vuex from "vuex"

import { UserModule, UserModuleName } from './modules/user';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    [UserModuleName]: UserModule,
  },
});
