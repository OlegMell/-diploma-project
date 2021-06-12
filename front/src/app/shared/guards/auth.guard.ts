import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { selectAuth } from '../selectors/auth.selectors';
import { map, take } from 'rxjs/operators';
import { Auth } from '../models/common.models';
import { AuthState } from '../store/shared.reducer';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private store$: Store<AuthState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.store$.select(selectAuth).pipe(
      map((auth: Auth) => {
        // TODO check token expires
        console.log(auth);
        if (!auth) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      })
    );

  }
}
