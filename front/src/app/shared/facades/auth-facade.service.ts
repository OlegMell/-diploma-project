import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedActions from '../store/shared.actions';
import {
  selectAuth,
  selectBio,
  selectFirstname,
  selectImage,
  selectProfileName,
  selectSIte
} from '../selectors/auth.selectors';
import { AppState } from '../../store';
import { Logout, UpdatePersonalData } from '../store/shared.actions';
import { PersonalData } from "../models/common.models";


@Injectable({ providedIn: 'root' })
export class AuthFacadeService {

  token$ = this.store.select(selectAuth);
  photo$ = this.store.select(selectImage);
  username$ = this.store.select(selectProfileName);
  firstname$ = this.store.select(selectFirstname);
  bio$ = this.store.select(selectBio);
  site$ = this.store.select(selectSIte);

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

  updateProfileData(data: any): void {
    this.store.dispatch(new UpdatePersonalData(data));
  }
}
