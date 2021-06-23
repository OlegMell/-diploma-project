import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectAuth } from '../selectors/auth.selectors';
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthState } from '../store/shared.reducer';
import { SnackbarService } from '../services/toastr.service';
import { LoginSuccess } from '../store/shared.actions';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private snackbar: SnackbarService,
              private store$: Store<AuthState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.store$.select(selectAuth).pipe(
      withLatestFrom(of(localStorage.getItem('access_token'))),
      map(([ auth, localToken ]) => {
        if (!auth && !localToken) {
          this.router.navigate([ 'login' ]);
          return false;
        } else if (auth && !this.authService.isTokenExpired(auth.token)) {
          return true;
        } else if (localToken &&
          this.authService.isTokenExpired(localToken)) {
          this.snackbar.open('Время вашего токена истекло, зайдите в аккаунт заново!');
          // this.router.navigate(['login']);
          return false;
        } else {
          if (localToken) {
            this.store$.dispatch(new LoginSuccess({ token: localToken }));
            return true;
          }
          return true;
        }
      })
    );

  }
}
