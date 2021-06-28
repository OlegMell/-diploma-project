import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from './shared.reducer';
import { selectAuth } from '../selectors/auth.selectors';
import { SnackbarService } from '../services/toastr.service';
import {
  SetPersonalData,
  UpdatePersonalDataError,
  UpdatePersonalDataSuccess
} from './shared.actions';


@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
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
            this.snackBarService.open('Аккаунт не найден, проверьте логин и пароль!');
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

      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
      }

      localStorage.setItem('access_token', auth.token);

      return auth.token;
    }),
    mergeMap((token: string) => this.authService.getUserProfile(token).pipe(
      map((r: any) => {
        console.log(r);
        return new SetPersonalData({ ...r.personalInfo, ...r });
      })
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
      localStorage.removeItem('access_token');
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
    mergeMap(([ action, auth ]) => this.authService.updatePersonaInfo(action.payload, auth.token)
      .pipe(
        map(res => {
          console.log(res);
          this.snackBarService.open('Сохранено!');
          return new UpdatePersonalDataSuccess({});
        })
      ),
    ),
    catchError(() => of(new UpdatePersonalDataError({})))
    )
  );
}
