import { AuthState } from '../store/shared.reducer';
import * as auth from '../store/shared.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const getAuth = (state: AuthState) => state.auth;
export const getPending = (state: AuthState) => state.pending;

export const selectAppState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const selectAuth: MemoizedSelector<object, any> = createSelector(selectAppState, getAuth);
export const selectPending: MemoizedSelector<object, any> = createSelector(selectAppState, getPending);
