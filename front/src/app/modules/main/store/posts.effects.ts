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
  PostsActions,
  RemovePostError,
  RemovePostSuccess,
  SetLikeError,
  SetLikeSuccess
} from './posts.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PostsService } from '../../../services/posts.service';
import { selectAuth } from '../../../shared/selectors/auth.selectors';
import { of } from 'rxjs';
import { PostWithAuthorData } from '../../../shared/models/common.models';
import { ErrorCatchService } from '../../../shared/services/error-catch.service';


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
              private errorCatchService: ErrorCatchService,
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
    mergeMap(([ action, auth ]) => this.dropboxService.uploadFile(action.payload.voice, '/post-audio/')
      .pipe(
        // @ts-ignore
        mergeMap((filePath: string) => this.dropboxService.uploadFilesArray(action.payload.images)
          .pipe(
            mergeMap(filesPaths => {
              return this.postsService.create({
                // @ts-ignore
                ...action.payload,
                images: filesPaths,
                voice: filePath
              }, auth.token);
            }),
            map(() => {
              // TODO  Изменить логику обновления состояния
              return new GetAllPosts();
            }),
            catchError(() => of(new CreatePostError()))
          ))
      )),
  ));

  /**
   * Получение постов
   */
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getAllPosts),
    withLatestFrom(this.store$.select(selectAuth)),
    mergeMap(([ _, auth ]) => this.postsService.getAll(auth.token)
      .pipe(
        map((res: PostWithAuthorData[]) => new GetAllPostsSuccess(res)),
        catchError((err) => {
          this.errorCatchService.checkError(err);
          return of(new GetAllPostsError());
        })
      ))
  ));

  /**
   * Получеине поста по айди автора
   */
  getByAuthorId$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.getByAuthorId),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.postsService.getByAuthorId(action.payload, auth.token)
      .pipe(
        map(res => new GetByAuthorIdSuccess(res)),
        catchError(() => of(new GetByAuthorIdError()))
      ))
  ));

  /**
   * Удаление поста
   */
  removePost$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.removePost),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.postsService.remove(action.payload, auth.token)
      .pipe(
        // @ts-ignore
        map(() => new RemovePostSuccess(action.payload)),
        catchError(() => of(new RemovePostError()))
      ))
  ));

  /**
   * Эффект установки лайка посту
   */
  setLike$ = createEffect(() => this.actions$.pipe(
    ofType(PostsActions.setLike),
    withLatestFrom(this.store$.select(selectAuth)),
    // @ts-ignore
    mergeMap(([ action, auth ]) => this.postsService.setLike(action.payload, auth.token).pipe(
      map(res => new SetLikeSuccess(res)),
      catchError(() => of(new SetLikeError()))
    ))
  ));
}
