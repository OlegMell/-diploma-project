import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const getPosts = (state: PostsState) => state.posts;

export const selectPostsState: MemoizedSelector<object, PostsState> = createFeatureSelector<PostsState>('posts');

export const selectPosts: MemoizedSelector<object, any> = createSelector(selectPostsState, getPosts);
