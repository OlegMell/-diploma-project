import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedActions from '../store/shared.actions';
import { selectAuth, selectImage, selectProfileName } from '../selectors/auth.selectors';
import { AppState } from '../../store';
import { Logout } from '../store/shared.actions';


@Injectable({ providedIn: 'root' })
export class AuthFacadeService {

  token$ = this.store.select(selectAuth);
  photo$ = this.store.select(selectImage);
  firstname$ = this.store.select(selectProfileName);

  constructor(private store: Store<AppState>) {
  }

  signIn(login: string, password: string): void {
    this.store.dispatch(new SharedActions.Login({ login, password }));
  }

  signUp(username: string, login: string, password: string): void {
    this.store.dispatch(new SharedActions.SignUp({ login, password, username }));
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
