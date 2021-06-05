import { ActionReducerMap } from '@ngrx/store';
import * as shared from '../shared/store/shared.reducer';

export interface AppState {
  shared: shared.State;
}

export const reducers: ActionReducerMap<any> = {
  shared: shared.reducer
};
