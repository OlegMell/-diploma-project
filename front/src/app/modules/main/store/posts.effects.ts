import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DropboxService } from '../../../services/dropbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../shared/services/toastr.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../shared/store/shared.reducer';
import { CreatePostError, GetAllPosts, GetAllPostsError, GetAllPostsSuccess, PostsActions } from './posts.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from '../../../services/posts.service';
import { selectAuth } from '../../../shared/selectors/auth.selectors';
import { of } from 'rxjs';
import { FullPost } from '../../../shared/models/common.models';

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions,
              private dropboxService: DropboxService,
              private router: Router,
              private route: ActivatedRoute,
              private readonly postsService: PostsService,
              private snackBarService: SnackbarService,
              private store$: Store<AuthState>) {
  }

  $createPost = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.create),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.postsService.create(action.payload, auth.token)
      .pipe(
        map(res => {
          console.log(res);
          return new GetAllPosts();
        }),
        catchError(() => of(new CreatePostError()))
      ))
  ));

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getAllPosts),
    withLatestFrom(this.store$.select(selectAuth)),
    mergeMap(([ _, auth ]) => this.postsService.getAll(auth.token).pipe(
      map((res: FullPost[]) => {
        console.log(res);
        return new GetAllPostsSuccess(res);
      }),
      catchError(() => of(new GetAllPostsError()))
    ))
  ));
}
