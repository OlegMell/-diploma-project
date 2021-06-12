import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from './shared.reducer';
import { selectAuth } from '../selectors/auth.selectors';


@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private store$: Store<AuthState>) {
  }

  /** Эффект входа в аккаунт */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.login),
    // @ts-ignore
    mergeMap((action) => this.authService.signIn(action.payload)
      .pipe(
        map(res => {
          console.log(res);
          return new SharedActions.LoginSuccess({ token: res.token });
        }),
        catchError(() => of(new SharedActions.LoginError()))
      ))
  ));

  /** Эффект регистрации */
  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.signUp),
    // @ts-ignore
    mergeMap((action) => this.authService.signUp(action.payload)
      .pipe(
        map(res => {
          return new SharedActions.SignUpSuccess({ token: res.token });
        }),
        catchError(() => of(new SharedActions.SignUpError()))
      ))
  ));

  /** Эффект удачного входа в аккаунт */
  successEnter$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.loginSuccess),
    withLatestFrom(this.store$.select(selectAuth)),
    map(async ([ _, auth ]) => {

      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
      }

      localStorage.setItem('access_token', auth.token);

      await this.router.navigate([ 'app' ], { relativeTo: this.route });
    })
  ), { dispatch: false });
}
