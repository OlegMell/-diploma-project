import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SharedActions from './shared.actions';


@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions,
              private authService: AuthService) {
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.login),
    mergeMap((action) => this.authService.signIn(action)
      .pipe(
        map(res => {
          console.log(res);
          return new SharedActions.LoginSuccess({ token: 'token' });
        }),
        catchError(() => of(new SharedActions.LoginError()))
      ))
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(SharedActions.AuthAction.signUp),
    mergeMap((action) => this.authService.signUp(action)
      .pipe(
        map(res => {
          console.log(res);
          return new SharedActions.SignUpSuccess({ token: 'token' });
        }),
        catchError(() => of(new SharedActions.SignUpError()))
      ))
  ));
}
