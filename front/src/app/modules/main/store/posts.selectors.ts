import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const getPosts = (state: PostsState) => state.posts;
export const getPending = (state: PostsState) => state.pending;
export const getUserPosts = (state: PostsState) => state.userPosts;

export const selectPostsState: MemoizedSelector<object, PostsState> = createFeatureSelector<PostsState>('posts');

export const selectPosts: MemoizedSelector<object, any> = createSelector(selectPostsState, getPosts);
export const selectPending: MemoizedSelector<object, any> = createSelector(selectPostsState, getPending);
export const selectUserPosts: MemoizedSelector<object, any> = createSelector(selectPostsState, getUserPosts);
