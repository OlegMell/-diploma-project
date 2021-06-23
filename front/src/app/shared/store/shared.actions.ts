import { Action } from '@ngrx/store';
import { Auth, CreateAccount, Credentials, PersonalData, Themes } from '../models/common.models';

/**
 * Экшены авторизации и регистрации
 */

export enum AuthAction {
  login = '[Login Page] Login',
  loginSuccess = '[Login Page] Login Success',
  loginError = '[Login Page] Login Error',

  logout = '[APP] Logout',

  setPersonalData = '[Login Page] Set Personal Data',

  signUp = '[Sign Up Page] Sign Up',
  signUpSuccess = '[Sign Up Page] Sign Up Success',
  signUpError = '[Sign Up Page] Sign Up Error',

}

export enum AppActions {
  setAppTheme = '[Theme] Set Current Theme'
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

export class SetTheme implements Action {
  readonly type = AppActions.setAppTheme;

  constructor(public payload: string) {
  }
}

export class SetPersonalData implements Action {
  readonly type = AuthAction.setPersonalData;

  constructor(public payload: any) {
  }
}


export type SharedActionUnion = Login
  | LoginSuccess
  | LoginError
  | SignUp
  | SignUpSuccess
  | SignUpError
  | SetTheme
  | SetPersonalData
  | Logout;
