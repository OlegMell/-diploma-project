import { Auth } from '../models/common.models';
import { AuthAction } from './shared.actions';
import { AuthActionUnion } from './shared.actions';

export interface AuthState {
  auth: Auth | null;
  pending: boolean;
}

export const initialState: AuthState = {
  auth: null,
  pending: false,
};


export function reducer(state: AuthState = initialState, action: AuthActionUnion): AuthState {
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
