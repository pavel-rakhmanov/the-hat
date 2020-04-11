import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { uuid } from  '../../utils';

const AUTO_DELETE_ERROR_DELAY = 5;

type Error = {
  id: string;
  raw: any;
  message: string;
  important?: boolean;
}

export const ErrorsModuleName = 'errors'

@Module({ namespaced: true, name: ErrorsModuleName })
export class ErrorsModule extends VuexModule {
  private _errors: Error[] = [];

  public get errors()   { return this._errors }

  @Action
  public addError(errorInfo: Partial<Omit<Error, 'id'>>) {
    const error: Error = {
      id: uuid(),
      raw: JSON.stringify(errorInfo.raw),
      message: errorInfo.message || 'ERROR',
      important: errorInfo.important || false
    };

    this.SET_ERRORS([...this.errors, error])

    if (!error.important) {
      setTimeout(() => {
        this.deleteError(error.id)
      }, 1000 * AUTO_DELETE_ERROR_DELAY)
    }
  }

  @Action
  public deleteError(errorId: Error['id']) {
    this.SET_ERRORS(this.errors.filter(error => error.id !== errorId));
  }

  @Mutation
  private SET_ERRORS(error: Error[]) {
    this._errors = error
  }
};
