import { FullPost } from '../../../shared/models/common.models';
import { PostsActions, PostsActionsUnion } from './posts.actions';

/**
 * Часть состояния - посты
 */

export interface PostsState {
  posts: FullPost[] | null;
}

/**
 * Начальное состояние
 */
export const initialState: PostsState = {
  posts: []
};


/**
 * Редьюсер
 */

export function reducer(state: PostsState = initialState, action: PostsActionsUnion): PostsState {
  switch (action.type) {
    case PostsActions.create:
      return { ...state };
    case PostsActions.createError:
      return { ...state };
    case PostsActions.createSuccess:
      return { ...state };
    case PostsActions.getAllPosts:
      return { ...state };
    case PostsActions.getAllPostsSuccess:
      return { ...state, posts: action.payload };
    case PostsActions.getAllPostsError:
      return { ...state };
    default:
      return { ...state };
  }
}
