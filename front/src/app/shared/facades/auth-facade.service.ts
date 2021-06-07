import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedActions from '../store/shared.actions';


@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  constructor(private store: Store) {
  }

  signIn(login: string, password: string): void {
    this.store.dispatch(SharedActions.login({ login, password }));
  }

  signUp(username: string, login: string, password: string): void {
    this.store.dispatch(SharedActions.signUp({login, password, username}));
  }
}
