import { FullPost } from '../../../shared/models/common.models';
import { PostsActions, PostsActionsUnion } from './posts.actions';

/**
 * Часть состояния - посты
 */

export interface PostsState {
  posts: FullPost[] | null;
  pending: boolean;
}

/**
 * Начальное состояние
 */
export const initialState: PostsState = {
  posts: [],
  pending: false
};


/**
 * Редьюсер
 */

export function reducer(state: PostsState = initialState, action: PostsActionsUnion): PostsState {
  switch (action.type) {
    case PostsActions.create:
      return { ...state, pending: true };
    case PostsActions.createError:
      return { ...state, pending: false };
    case PostsActions.createSuccess:
      return {
        ...state,
        posts: [ ...state.posts as FullPost[], action.payload ],
        pending: false
      };
    case PostsActions.getAllPosts:
      return { ...state, pending: true };
    case PostsActions.getAllPostsSuccess:
      return { ...state, posts: action.payload, pending: false };
    case PostsActions.getAllPostsError:
      return { ...state, pending: false };
    case PostsActions.getByAuthorId:
      return { ...state, pending: true };
    case PostsActions.getByAuthorIdSuccess:
      return { ...state, posts: action.payload, pending: false };
    case PostsActions.getByAuthorIdError:
      return { ...state, pending: false };
    case PostsActions.removePost:
      return { ...state, pending: true };
    case PostsActions.removePostSuccess:
      return {
        ...state,
        posts: [ ...state.posts?.filter(post => post._id !== action.payload) as FullPost[] ],
        pending: false
      };
    case PostsActions.removePostError:
      return { ...state, pending: false };
    default:
      return { ...state };
  }
}
