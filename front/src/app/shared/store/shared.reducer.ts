import { Auth, FoundUsers, PersonalData, Themes } from '../models/common.models';
import { AppActions, AuthAction, FollowSubscriptionsActions, SharedActionUnion } from './shared.actions';
import { ThemeHelper } from '../helpers/theme.helper';
import { APP_THEME } from '../constants/app.constants';

/**
 * Часть состояния - авторизация
 */

export interface AuthState {
  auth: Auth | null;
  pending: boolean;
  theme: string;
  personalData: PersonalData | null;
  foundUsers: FoundUsers | null;
}


let t = Themes.LIGHT;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  t = Themes.DARK;
}

const theme = localStorage.getItem(APP_THEME);
if (theme) {
  t = ThemeHelper.fromString(theme);
}

/**
 * Начальное состояние
 */
export const initialAuthState: AuthState = {
  auth: null,
  pending: false,
  theme: t,
  personalData: null,
  foundUsers: null
};

/**
 * Редьюсер авторизации
 */
export function reducer(state: AuthState = initialAuthState, action: SharedActionUnion): AuthState {
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

    case AuthAction.updatePersonalData:
      return { ...state, pending: true };

    case AuthAction.updatePersonalDataSuccess:
      return { ...state, pending: false };

    case AuthAction.updatePersonalDataError:
      return { ...state, pending: false };

    case AppActions.searchUsers:
      return { ...state, pending: true };

    case AppActions.searchUsersSuccess:
      return { ...state, foundUsers: action.payload, pending: false };

    case AppActions.searchUsersError:
      return { ...state, pending: false };

    case FollowSubscriptionsActions.setFollow:
      return { ...state, pending: true };

    case FollowSubscriptionsActions.setFollowSuccess:
      return { ...state, pending: false };

    case FollowSubscriptionsActions.setFollowError:
      return { ...state, pending: false };

    default:
      return { ...state };
  }
}
