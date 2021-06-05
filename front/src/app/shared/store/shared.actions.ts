import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ login: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
      props<{token: string}>()
);

export const loginError = createAction(
  '[Login Page] Login Error'
);

export const signUp = createAction(
  '[SignUp Page] Sign Up',
  props<{login: string, password: string, username: string}>()
);

export const signUpSuccess = createAction(
  '[SignUp Page] SignUp Success',
  props<{token: string}>()
);

export const signUpError = createAction(
  '[SignUp Page] SignUp Error'
);
