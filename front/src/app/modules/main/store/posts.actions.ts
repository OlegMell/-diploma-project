import { Action } from '@ngrx/store';
import { FullPost, Post } from '../../../shared/models/common.models';

export enum PostsActions {
  create = '[POSTS] Create Post',
  createSuccess = '[POSTS] Create Post Success',
  createError = '[POSTS] Create Post Error',

  getAllPosts = '[POSTS] Get All',
  getAllPostsSuccess = '[POSTS] Get All Success',
  getAllPostsError = '[POSTS] Get All Error',
  getByAuthorId = '[POSTS] Get By Author Id',
  getByAuthorIdSuccess = '[POSTS] Get By Author Id Success',
  getByAuthorIdError = '[POSTS] Get By Author Id Error',

  removePost = '[POSTS] Remove Post',
  removePostSuccess = '[POSTS] Remove Post Success',
  removePostError = '[POSTS] Remove Post Error',
}

export class CreatePost implements Action {
  readonly type = PostsActions.create;

  constructor(public payload: Post) {
  }
}

export class CreatePostSuccess implements Action {
  readonly type = PostsActions.createSuccess;

  constructor(public payload: FullPost) {
  }
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

export class GetByAuthorId implements Action {
  readonly type = PostsActions.getByAuthorId;

  constructor(public payload: string) {
  }
}

export class GetByAuthorIdSuccess implements Action {
  readonly type = PostsActions.getByAuthorIdSuccess;

  constructor(public payload: FullPost[]) {
  }
}

export class GetByAuthorIdError implements Action {
  readonly type = PostsActions.getByAuthorIdError;
}

export class RemovePost implements Action {
  readonly type = PostsActions.removePost;

  constructor(public payload: string) {
  }
}

export class RemovePostSuccess implements Action {
  readonly type = PostsActions.removePostSuccess;

  constructor(public payload: string) {
  }
}

export class RemovePostError implements Action {
  readonly type = PostsActions.removePostError;
}


export type PostsActionsUnion = CreatePost
  | CreatePostSuccess
  | CreatePostError
  | GetAllPosts
  | GetAllPostsSuccess
  | GetAllPostsError
  | GetByAuthorId
  | GetByAuthorIdSuccess
  | GetByAuthorIdError
  | RemovePost
  | RemovePostSuccess
  | RemovePostError;
