import { getModule } from 'vuex-module-decorators'
import { store } from './store';
import { UserModule } from './modules/user';

export default store;
export const UserStore = getModule(UserModule, store);
