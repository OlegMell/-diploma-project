import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import {
  LoginError,
  LoginSuccess,
  SearchUsersError,
  SearchUsersSuccess,
  SetPersonalData,
  UpdatePersonalData,
  UpdatePersonalDataError
} from './shared.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from './shared.reducer';
import { selectAuth } from '../selectors/auth.selectors';
import { SnackbarService } from '../services/toastr.service';
import { ACCOUNT_NOT_FOUND, SUCCESS_SAVED } from '../constants/snack-messages.constants';
import { ACCESS_TOKEN } from '../constants/app.constants';
import { DropboxService } from '../../services/dropbox.service';
import { SearchService } from '../../services/search.service';
import { FoundUsers } from '../models/common.models';


@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private readonly searchService: SearchService,
              private dropboxService: DropboxService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBarService: SnackbarService,
              private store$: Store<AuthState>) {
  }

  /**
   * Эффект входа в аккаунт
   */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.login),
    // @ts-ignore
    mergeMap((action) => this.authService.signIn(action.payload)
      .pipe(
        map(res => {
          if (!res) {
            this.snackBarService.open(ACCOUNT_NOT_FOUND);
            return new SharedActions.LoginError();
          } else {
            return new SharedActions.LoginSuccess({ token: res.token });
          }
        }),
        catchError(() => of(new SharedActions.LoginError()))
      ))
  ));

  /**
   * Эффект регистрации
   */
  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.signUp),
    // @ts-ignore
    mergeMap((action) => this.authService.signUp(action.payload)
      .pipe(
        map(res => {
          return new SharedActions.LoginSuccess({ token: res.token });
        }),
        catchError(() => of(new SharedActions.SignUpError()))
      ))
  ));

  /**
   * Эффект удачного входа в аккаунт
   */
  successEnter$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.loginSuccess),
    withLatestFrom(this.store$.select(selectAuth)),
    map(([ _, auth ]) => {

      if (localStorage.getItem(ACCESS_TOKEN)) {
        localStorage.removeItem(ACCESS_TOKEN);
      }

      localStorage.setItem(ACCESS_TOKEN, auth.token);

      return auth.token;
    }),
    mergeMap((token: string) => this.authService.getUserProfile(token)
      .pipe(
        mergeMap((r: any) => this.dropboxService.getLink(r.personalInfo.photo)
          .pipe(
            map(link => new SetPersonalData({
              ...r.personalInfo,
              ...r, photo: link
            })),
            catchError(() => of(new LoginError()))
          ))
      )),
  ));

  /**
   * Установка данных пользователя
   */
  $setPersonalData = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.setPersonalData),
    map(async () => {
      const url = this.router.url.slice(this.router.url.indexOf('/') + 1);
      await this.router.navigate([ url.includes('auth') ? 'main' : url ], { relativeTo: this.route });
    })
  ), { dispatch: false });


  /**
   * Эффект выхода из аккаунта
   */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.logout),
    map(async () => {
      localStorage.removeItem(ACCESS_TOKEN);
      await this.router.navigate([ 'login' ]);
    })
  ), { dispatch: false });

  /**
   * Эффект изменения данных профиля
   */
  updatePersonalInfo$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.updatePersonalData),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.dropboxService.uploadFile(action.payload.file)
      .pipe(
        mergeMap((filePath: string) => this.authService.updatePersonaInfo({
          ...(action as UpdatePersonalData).payload,
          img: filePath
        }, auth.token)
          .pipe(
            map(r => {
                this.snackBarService.open(SUCCESS_SAVED);
                return new LoginSuccess(auth);
              }
            ),
            catchError(() => of(new UpdatePersonalDataError({})))
          )))),
  ));

  searchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AppActions.searchUsers),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.searchService.findUsers(action.payload, auth.token)
      .pipe(
        map((res: FoundUsers) => new SearchUsersSuccess(res)),
        catchError(() => of(new SearchUsersError('ERROR')))
      ))
  ));


}
