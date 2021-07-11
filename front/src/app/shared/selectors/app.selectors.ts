import { AuthState } from '../store/shared.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const getTheme = (state: AuthState) => state.theme;
export const getFoundUsers = (state: AuthState) => state.foundUsers;

export const selectAppState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const selectTheme: MemoizedSelector<object, any> = createSelector(selectAppState, getTheme);

export const selectFoundUsers: MemoizedSelector<object, any> = createSelector(selectAppState, getFoundUsers);
