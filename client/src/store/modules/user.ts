import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { BaseUser } from '../../../../types';

import router, { PAGE_NAMES, resetRouter } from '@/router';
import { API } from '@/api';
import { localStorageGet, localStorageSet } from '@/utils';

export type IUserState = Partial<BaseUser> & {
  isAuthorized: boolean
  user: BaseUser | null
}

export const UserModuleName = 'user'

@Module({ namespaced: true, name: UserModuleName })
export class UserModule extends VuexModule implements IUserState {
  private _user: IUserState['user'] = null
  
  public get user()   { return this._user ? { ...this._user } : null }
  public get id()     { return this.user?.id }
  public get name()   { return this.user?.name }
  public get avatar() { return this.user?.avatar }
  
  public get isAuthorized() { return !!this.user?.id }

  @Action
  public async Login(userInfo: Pick<BaseUser, 'id'>) {
    const response = await API.signIn(userInfo.id);
    const user = response.data

    if (!user) return 

    this.SET_USER(user)
    localStorageSet(UserModuleName, user.id)

    router.push({
      name: PAGE_NAMES.Main
    })
  }

  @Action
  public async LogOut() {
    this.SET_USER(null);
    localStorageSet(UserModuleName, '')

    resetRouter();
  }

  @Action
  public async tryToRestoreUser() {
    const id = localStorageGet(UserModuleName);

    if (id) this.Login({ id });
  }

  @Mutation
  private SET_USER(user: IUserState['user']) {
    this._user = user
  }
};
