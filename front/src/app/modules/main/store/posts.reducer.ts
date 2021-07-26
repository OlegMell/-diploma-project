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
    case PostsActions.getByAuthorId:
      return { ...state };
    case PostsActions.getByAuthorIdSuccess:
      return { ...state, posts: action.payload };
    case PostsActions.getByAuthorIdError:
      return { ...state };
    default:
      return { ...state };
  }
}
