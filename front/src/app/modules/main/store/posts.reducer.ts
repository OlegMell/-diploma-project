import { FullPost, PostWithAuthorData } from '../../../shared/models/common.models';
import { PostsActions, PostsActionsUnion } from './posts.actions';

/**
 * Часть состояния - посты
 */

export interface PostsState {
  posts: PostWithAuthorData[] | null;
  userPosts: PostWithAuthorData[] | null;
  pending: boolean;
}

/**
 * Начальное состояние
 */
export const initialState: PostsState = {
  posts: [],
  userPosts: [],
  pending: false
};


/**
 * Редьюсер постов
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
      return { ...state, userPosts: action.payload, pending: false };
    case PostsActions.getByAuthorIdError:
      return { ...state, pending: false };
    case PostsActions.removePost:
      return { ...state, pending: true };
    case PostsActions.removePostSuccess:
      return {
        ...state,
        posts: [ ...state.posts?.filter(post => post.post._id !== action.payload) as PostWithAuthorData[] ],
        pending: false
      };
    case PostsActions.removePostError:
      return { ...state, pending: false };
    case PostsActions.setLike:
      return { ...state, pending: true };
    case PostsActions.setLikeSuccess:
      // @ts-ignore
      return { ...state, pending: false, posts: [...state.posts?.slice(0).map((postData) => {
        const nPost = Object.assign({}, postData);
        if (nPost.post._id === action.payload._id) {
          nPost.post.isLiked = !nPost.post.isLiked;
          nPost.post.likes = nPost.post.isLiked ? nPost.post.likes + 1 : nPost.post.likes - 1;
          }
        return nPost;
        })] };
    case PostsActions.setLikeError:
      return { ...state, pending: false };
    default:
      return { ...state };
  }
}
