import { getModule } from 'vuex-module-decorators'
import { store } from './store';
import { UserModule } from './modules/user';
import { ErrorsModule } from './modules/errors';

export default store;
export const UserStore = getModule(UserModule, store);
export const ErrorsStore = getModule(ErrorsModule, store);
