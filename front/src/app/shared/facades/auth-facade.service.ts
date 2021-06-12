import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedActions from '../store/shared.actions';
import { selectAuth } from '../selectors/auth.selectors';
import { AppState } from '../../store';


@Injectable({ providedIn: 'root' })
export class AuthFacadeService {

  token$ = this.store.select(selectAuth);

  constructor(private store: Store<AppState>) {
  }

  signIn(login: string, password: string): void {
    this.store.dispatch(new SharedActions.Login({ login, password }));
  }

  signUp(username: string, login: string, password: string): void {
    this.store.dispatch(new SharedActions.SignUp({ login, password, username }));
  }
}
