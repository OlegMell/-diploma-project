import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/shared.reducer';
import { selectPending } from '../selectors/auth.selectors';
import { selectFoundUsers, selectTheme } from '../selectors/app.selectors';
import { SearchUsers, SetTheme } from '../store/shared.actions';

@Injectable({ providedIn: 'root' })
export class AppFacadeService {

  pending$ = this.store$.select(selectPending);
  theme$ = this.store$.select(selectTheme);
  foundUsers$ = this.store$.select(selectFoundUsers);

  constructor(private store$: Store<AuthState>) {
  }

  setCurrentTheme(theme: string): void {
    this.store$.dispatch(new SetTheme(theme));
  }

  searchUsers(query: string): void {
    this.store$.dispatch(new SearchUsers(query));
  }
}
