import { ActionReducerMap } from '@ngrx/store';
import * as shared from '../shared/store/shared.reducer';
import * as posts from '../modules/main/store/posts.reducer';

export interface AppState {
  auth: shared.AuthState;
  posts: posts.PostsState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: shared.reducer,
  posts: posts.reducer
};
