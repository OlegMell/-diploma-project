import { Auth, PersonalData, Themes } from '../models/common.models';
import { AppActions, AuthAction, SharedActionUnion } from './shared.actions';

/**
 * Часть состояния - авторизация
 */

export interface AuthState {
  auth: Auth | null;
  pending: boolean;
  theme: string;
  personalData: PersonalData | null;
}


let t = Themes.LIGHT;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  t = Themes.DARK;
}

/**
 * Начальное состояние
 */
export const initialState: AuthState = {
  auth: null,
  pending: false,
  theme: t,
  personalData: null
};

/**
 * Редьюсер авторизации
 */
export function reducer(state: AuthState = initialState, action: SharedActionUnion): AuthState {
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

    case AuthAction.logout:
      return { ...state, auth: null };

    case AppActions.setAppTheme:
      return { ...state, theme: action.payload };

    case AuthAction.setPersonalData:
      return { ...state, personalData: action.payload };

    default:
      return { ...state };
  }
}
