import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, PostWithAuthorData } from '../../models/common.models';
import { Observable, of, Subject } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { filter, mergeMap, reduce, takeUntil } from 'rxjs/operators';
import { DropboxService } from '../../../services/dropbox.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsFacadeService } from '../../../modules/main/services/posts-facade.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-small',
  templateUrl: './post-small.component.html',
  styleUrls: [ './post-small.component.scss' ]
})
export class PostSmallComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  user!: any; // автор поста
  images!: Observable<string[]>; // картинки
  isRootProfile!: boolean; // флаг страницы профиля
  voice!: Observable<string>; // ссылка на войс поста
  currUserId!: string; // айди текущего пользователя

  @Input() postData!: PostWithAuthorData; // данные о посте и авторе

  constructor(private readonly searchService: SearchService,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              public readonly postsFacade: PostsFacadeService,
              private readonly dropboxService: DropboxService,
              private readonly authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.authFacade.token$
      .pipe(takeUntil(this.uns$))
      .subscribe((auth: Auth) => this.currUserId = this.authService.getIdFromToken(auth.token as string));

    this.getImages();
    this.getVoice();

    console.log(this.postData);

    this.route.params.pipe(
      takeUntil(this.uns$),
      filter((params: Params) => !params.id)
    ).subscribe(() => this.isRootProfile = true);
  }

  /**
   * Получение автора поста
   */
  // getUserDataObserver(): void {
  //   if (this.postData && this.postData.authorData) {
  //
  //     this.authFacade.token$
  //       .pipe(
  //         takeUntil(this.uns$),
  //         mergeMap((auth) => this.searchService.findById(this.postData.author, auth.token))
  //       ).subscribe(user => {
  //       // this.user = user
  //       console.log('RERERE');
  //     });
  //
  //   }
  // }

  /**
   * Получение картинок поста из дропбокса
   */
  private getImages(): void {
    if (this.postData && this.postData.post.images?.length) {
      this.images = of(...this.postData.post.images)
        .pipe(
          takeUntil(this.uns$),
          mergeMap((img: string) => this.dropboxService.getLink(img)),
          reduce((acc: string[], val: string) => [ ...acc, val ], [])
        );
    }
  }

  /**
   * Получение записи из дропбокса
   */
  private getVoice(): void {
    if (this.postData && this.postData.post.voice?.length) {
      this.voice = of(this.postData.post.voice)
        .pipe(
          takeUntil(this.uns$),
          mergeMap((voice: string) => this.dropboxService.getLink(voice))
        );
    }
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
