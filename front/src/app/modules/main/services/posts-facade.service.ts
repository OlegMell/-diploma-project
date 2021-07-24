import { Injectable } from '@angular/core';
import { PostsState } from '../store/posts.reducer';
import { Store } from '@ngrx/store';
import { CreatePost, GetAllPosts } from '../store/posts.actions';
import { Post } from '../../../shared/models/common.models';
import { selectPosts } from '../store/posts.selectors';

@Injectable({ providedIn: 'root' })
export class PostsFacadeService {
  posts$ = this.store$.select(selectPosts);

  constructor(private readonly store$: Store<PostsState> ) {
  }

  createPost(post: Post): void {
    this.store$.dispatch(new CreatePost(post));
  }

  getAll(): void {
    this.store$.dispatch(new GetAllPosts());
  }
}
