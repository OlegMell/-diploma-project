import { Auth } from '../models/common.models';
import { AuthAction } from './shared.actions';
import { AuthActionUnion } from './shared.actions';

export interface State {
  auth: Auth | null;
  pending: boolean;
}

export const initialState: State = {
  auth: null,
  pending: false,
};


export function reducer(state: State = initialState, action: AuthActionUnion): State {
  switch (action.type) {
    case AuthAction.login:
      return { ...state, pending: true };

    case AuthAction.loginSuccess:
      return { ...state, pending: false, auth: action.payload };

    case AuthAction.loginError:
      return { ...state, pending: false };

    case AuthAction.signUp:
      return { ...state, pending: true };

    case AuthAction.signUpSuccess:
      return { ...state, pending: false };

    case AuthAction.signUpError:
      return { ...state, pending: false };

    default:
      return { ...state };
  }
}
