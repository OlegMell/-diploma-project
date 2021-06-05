import { Auth } from '../models/common.models';
import { Action } from '@ngrx/store';
import * as SharedActions from './shared.actions';

export interface State {
  auth: Auth | null;
  pending: boolean;
}

const initialState: State = {
  auth: null,
  pending: false
};

// tslint:disable-next-line:typedef
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SharedActions.login.type:
      return { state, pending: true };
    case SharedActions.loginSuccess.type:
      return { state, pending: false };
    case SharedActions.loginError.type:
      return { state, pending: false };
    default:
      return state;
  }
}
