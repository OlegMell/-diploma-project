import { State } from '../store/shared.reducer';
import * as auth from '../store/shared.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const getAuth = (state: State) => state.auth;

export const selectAppState: MemoizedSelector<object, State> = createFeatureSelector<State>('app');

export const selectAuth: MemoizedSelector<object, any> = createSelector(selectAppState, getAuth);
