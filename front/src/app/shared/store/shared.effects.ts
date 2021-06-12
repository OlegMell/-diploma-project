import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SharedActions from './shared.actions';
import { createSelector } from "@ngrx/store";
import { AuthAction, LoginSuccess } from './shared.actions';
import { Router } from "@angular/router";


@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

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

  successEnter$ = createEffect(() => this.actions$.pipe(
    ofType(AuthAction.loginSuccess),
    tap(() => {
      this.router.navigate([ 'app' ]);
    })
  ), { dispatch: false });
}
