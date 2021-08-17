import { Injectable } from '@angular/core';
import { PostsState } from '../store/posts.reducer';
import { Store } from '@ngrx/store';
import { CreatePost, GetAllPosts, GetByAuthorId, RemovePost, SetLike } from '../store/posts.actions';
import { Post } from '../../../shared/models/common.models';
import { selectPending, selectPosts, selectUserPosts } from '../store/posts.selectors';

@Injectable({ providedIn: 'root' })
export class PostsFacadeService {
  posts$ = this.store$.select(selectPosts);
  userPosts$ = this.store$.select(selectUserPosts);
  pending$ = this.store$.select(selectPending);

  constructor(private readonly store$: Store<PostsState>) {
  }

  createPost(post: Post): void {
    this.store$.dispatch(new CreatePost(post));
  }

  getAll(): void {
    this.store$.dispatch(new GetAllPosts());
  }

  getByAuthorId(id: string): void {
    this.store$.dispatch(new GetByAuthorId(id));
  }

  removePost(id: string): void {
    this.store$.dispatch(new RemovePost(id));
  }

  setLike(id: string): void {
    this.store$.dispatch(new SetLike(id));
  }
}
