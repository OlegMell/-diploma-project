import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedActions from '../store/shared.actions';
import { Logout, UpdatePersonalData } from '../store/shared.actions';
import {
  selectAuth,
  selectBio,
  selectFirstname,
  selectImage,
  selectProfileName,
  selectSIte
} from '../selectors/auth.selectors';
import { AppState } from '../../store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';


/**
 * Фасад-Сервис для работы с хранилищем и доступом к стейту
 */
@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  /**
   * Данные пользователя
   */
  token$ = this.store.select(selectAuth);
  photo$ = this.store.select(selectImage);
  username$ = this.store.select(selectProfileName);
  firstname$ = this.store.select(selectFirstname);
  bio$ = this.store.select(selectBio);
  site$ = this.store.select(selectSIte);

  constructor(private readonly store: Store<AppState>,
              private readonly authService: AuthService) {
  }

  /**
   * Метод авторизации польователя
   * @param login эмайл или никнейм
   * @param password пароль
   */
  signIn(login: string, password: string): void {
    this.store.dispatch(new SharedActions.Login({ login, password }));
  }

  /**
   * Метод регистрации пользователя
   * @param username никнейм
   * @param login емайл пользователя
   * @param password пароль
   */
  signUp(username: string, login: string, password: string): void {
    this.store.dispatch(new SharedActions.SignUp({ login, password, username }));
  }

  /**
   * Метод выхода из аккаунта
   */
  logout(): void {
    this.store.dispatch(new Logout());
  }

  /**
   * Метод обновления данных о пользователе
   * @param data новые данные из формы редактирования профиля
   */
  updateProfileData(data: any): void {
    this.store.dispatch(new UpdatePersonalData(data));
  }

  getCurrentUserId(route: ActivatedRoute): Observable<string> {
    return route.params
      .pipe(
        mergeMap((params: Params) => {
          if (!params.id) {
            return this.token$
              .pipe(
                map(auth => this.authService.getIdFromToken(auth.token))
              );
          }
          return of(params.id);
        })
      );
  }
}
