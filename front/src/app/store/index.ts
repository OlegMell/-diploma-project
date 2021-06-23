import { ActionReducerMap } from '@ngrx/store';
import * as shared from '../shared/store/shared.reducer';

export interface AppState {
  auth: shared.AuthState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: shared.reducer
};
