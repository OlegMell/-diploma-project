import { AuthState } from '../store/shared.reducer';
import * as auth from '../store/shared.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const getAuth = (state: AuthState) => state.auth;
export const getPending = (state: AuthState) => state.pending;
export const getProfileImage = (state: AuthState) => state.personalData?.photo;
export const getProfileName = (state: AuthState) => state.personalData?.username;

export const selectAppState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('auth');

export const selectAuth: MemoizedSelector<object, any> = createSelector(selectAppState, getAuth);
export const selectPending: MemoizedSelector<object, any> = createSelector(selectAppState, getPending);
export const selectImage: MemoizedSelector<object, any> = createSelector(selectAppState, getProfileImage);
export const selectProfileName: MemoizedSelector<object, any> = createSelector(selectAppState, getProfileName);
