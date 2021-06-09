import { Action } from '@ngrx/store';
import { Auth, CreateAccount, Credentials } from '../models/common.models';

export enum AuthAction {
  login = '[Login Page] Login',
  loginSuccess = '[Login Page] Login Success',
  loginError = '[Login Page] Login Error',

  signUp = '[Sign Up Page] Sign Up',
  signUpSuccess = '[Sign Up Page] Sign Up Success',
  signUpError = '[Sign Up Page] Sign Up Error',
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
  constructor() {
  }
}


export type AuthActionUnion =
  Login |
  LoginSuccess |
  LoginError |
  SignUp |
  SignUpSuccess |
  SignUpError;
