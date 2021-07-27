import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DropboxService } from '../../../services/dropbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../shared/services/toastr.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../shared/store/shared.reducer';
import {
  CreatePostError,
  GetAllPosts,
  GetAllPostsError,
  GetAllPostsSuccess,
  GetByAuthorIdError,
  GetByAuthorIdSuccess,
  PostsActions
} from './posts.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from '../../../services/posts.service';
import { selectAuth } from '../../../shared/selectors/auth.selectors';
import { of } from 'rxjs';
import { FullPost } from '../../../shared/models/common.models';


/**
 * Эффекты работы с постами
 */
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

  // $createPost = createEffect(() => this.actions$.pipe(
  //   ofType(PostsActions.create),
  //   withLatestFrom(this.store$.select(selectAuth)),
  //   // @ts-ignore
  //   mergeMap(([ action, auth ]) => this.postsService.create(action.payload, auth.token)
  //     .pipe(
  //       map(res => {
  //         console.log(res);
  //         return new GetAllPosts();
  //       }),
  //       catchError(() => of(new CreatePostError()))
  //     ))
  // ));

  /**
   * Эффект создания поста
   */
  $createPost = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.create),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.dropboxService.uploadFilesArray(action.payload.images)
      .pipe(
        mergeMap(filesPaths => {
          return this.postsService.create({
            // @ts-ignore
            ...action.payload,
            images: filesPaths
          }, auth.token);
        }),
        map(() => new GetAllPosts()),
        catchError(() => of(new CreatePostError()))
      )),
  ));

  /**
   * Получение постов
   */
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getAllPosts),
    withLatestFrom(this.store$.select(selectAuth)),
    mergeMap(([ _, auth ]) => this.postsService.getAll(auth.token).pipe(
      map((res: FullPost[]) => {
        return new GetAllPostsSuccess(res);
      }),
      catchError(() => of(new GetAllPostsError()))
    ))
  ));

  /**
   * Получеине поста по айди автора
   */
  getByAuthorId$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getByAuthorId),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.postsService.getByAuthorId(action.payload, auth.token).pipe(
      map(res => {
        return new GetByAuthorIdSuccess(res);
      }),
      catchError(() => of(new GetByAuthorIdError()))
    ))
  ));
}
