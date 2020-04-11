import Vue from "vue"
import Vuex from "vuex"

import { UserModule, UserModuleName } from './modules/user';
import { ErrorsModule, ErrorsModuleName } from './modules/errors';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    [UserModuleName]: UserModule,
    [ErrorsModuleName]: ErrorsModule,
  },
});
