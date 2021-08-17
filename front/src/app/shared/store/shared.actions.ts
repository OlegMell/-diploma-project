import { Action } from '@ngrx/store';
import { Auth, CreateAccount, Credentials, FollowDto, FoundUsers } from '../models/common.models';

/**
 * Экшены авторизации и регистрации
 */

export enum AuthAction {
  login = '[Login Page] Login',
  loginSuccess = '[Login Page] Login Success',
  loginError = '[Login Page] Login Error',

  logout = '[APP] Logout',

  setPersonalData = '[Login Page] Set Personal Data',
  updatePersonalData = '[Login Page] Update Personal Data',
  updatePersonalDataSuccess = '[Login Page] Update Personal Data Success',
  updatePersonalDataError = '[Login Page] Update Personal Data Error',

  signUp = '[Sign Up Page] Sign Up',
  signUpSuccess = '[Sign Up Page] Sign Up Success',
  signUpError = '[Sign Up Page] Sign Up Error',

}

export enum AppActions {
  setAppTheme = '[Theme] Set Current Theme',
  searchUsers = '[SEARCH] SEARCH USERS',
  searchUsersSuccess = '[SEARCH] SEARCH USERS Success',
  searchUsersError = '[SEARCH] SEARCH USERS Error',
}

export enum FollowSubscriptionsActions {
  setFollow = '[FOLLOWS] SET_FOLLOW',
  setFollowSuccess = '[FOLLOWS] SET_FOLLOW_SUCCESS',
  setFollowError = '[FOLLOWS] SET_FOLLOW_ERROR',
}


export class Login implements Action {
  readonly type = AuthAction.login;

  constructor(public payload: Credentials) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthAction.loginSuccess;

  constructor(public payload: Auth) {
  }
}

export class LoginError implements Action {
  readonly type = AuthAction.loginError;

  constructor() {
  }
}

export class SignUp implements Action {
  readonly type = AuthAction.signUp;

  constructor(public payload: CreateAccount) {
  }
}

export class SignUpSuccess implements Action {
  readonly type = AuthAction.signUpSuccess;

  constructor(public payload: Auth) {
  }
}

export class SignUpError implements Action {
  readonly type = AuthAction.signUpError;
}

export class Logout implements Action {
  readonly type = AuthAction.logout;
}


export class SetPersonalData implements Action {
  readonly type = AuthAction.setPersonalData;

  constructor(public payload: any) {
  }
}

export class UpdatePersonalData implements Action {
  readonly type = AuthAction.updatePersonalData;

  constructor(public payload: any) {
  }
}

export class UpdatePersonalDataSuccess implements Action {
  readonly type = AuthAction.updatePersonalDataSuccess;

  constructor(public payload: any) {
  }
}

export class UpdatePersonalDataError implements Action {
  readonly type = AuthAction.updatePersonalDataError;

  constructor(public payload: any) {
  }
}

export class SetTheme implements Action {
  readonly type = AppActions.setAppTheme;

  constructor(public payload: string) {
  }
}

export class SearchUsers implements Action {
  readonly type = AppActions.searchUsers;

  constructor(public payload: string) {
  }
}

export class SearchUsersSuccess implements Action {
  readonly type = AppActions.searchUsersSuccess;

  constructor(public payload: FoundUsers | null) {
  }
}

export class SearchUsersError implements Action {
  readonly type = AppActions.searchUsersError;

  constructor(public payload: string) {
  }
}

export class SetFollow implements Action {
  readonly type = FollowSubscriptionsActions.setFollow;

  constructor(public payload: FollowDto) {
  }
}

export class SetFollowSuccess implements Action {
  readonly type = FollowSubscriptionsActions.setFollowSuccess;
}

export class SetFollowError implements Action {
  readonly type = FollowSubscriptionsActions.setFollowError;
}

export type SharedActionUnion = Login
  | LoginSuccess
  | LoginError
  | SignUp
  | SignUpSuccess
  | SignUpError
  | SetTheme
  | SearchUsers
  | SearchUsersSuccess
  | SearchUsersError
  | SetPersonalData
  | UpdatePersonalData
  | UpdatePersonalDataSuccess
  | UpdatePersonalDataError
  | SetFollow
  | SetFollowSuccess
  | SetFollowError
  | Logout;
