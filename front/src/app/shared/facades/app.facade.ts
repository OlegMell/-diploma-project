import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/shared.reducer';
import { selectPending } from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AppFacade {

  pending$ = this.store$.select(selectPending);

  constructor(private store$: Store<AuthState>) {
  }
}
