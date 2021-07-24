import { Action } from '@ngrx/store';
import { FullPost, Post } from '../../../shared/models/common.models';

export enum PostsActions {
  create = '[POSTS] Create Post',
  createSuccess = '[POSTS] Create Post Success',
  createError = '[POSTS] Create Post Error',

  getAllPosts = '[POSTS] Get All',
  getAllPostsSuccess = '[POSTS] Get All Success',
  getAllPostsError = '[POSTS] Get All Error',
}

export class CreatePost implements Action {
  readonly type = PostsActions.create;

  constructor(public payload: Post) {
  }
}

export class CreatePostSuccess implements Action {
  readonly type = PostsActions.createSuccess;
}

export class CreatePostError implements Action {
  readonly type = PostsActions.createError;
}

export class GetAllPosts implements Action {
  readonly type = PostsActions.getAllPosts;
}

export class GetAllPostsSuccess implements Action {
  readonly type = PostsActions.getAllPostsSuccess;
  constructor(public payload: FullPost[]) {
  }
}

export class GetAllPostsError implements Action {
  readonly type = PostsActions.getAllPostsError;
}


export type PostsActionsUnion = CreatePost
  | CreatePostSuccess
  | CreatePostError
  | GetAllPosts
  | GetAllPostsSuccess
  | GetAllPostsError;
