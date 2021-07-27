import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FullPost } from '../../models/common.models';
import { Observable, of, Subject } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { mergeMap, reduce, takeUntil } from 'rxjs/operators';
import { DropboxService } from '../../../services/dropbox.service';

@Component({
  selector: 'app-post-small',
  templateUrl: './post-small.component.html',
  styleUrls: [ './post-small.component.scss' ]
})
export class PostSmallComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>();
  @Input() postData!: FullPost;
  user$!: any;
  images!: Observable<string[]>;

  constructor(private readonly searchService: SearchService,
              private readonly dropboxService: DropboxService,
              private readonly authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.getUserDataObserver();
    this.getImages();
  }

  /**
   * Получение автора поста
   */
  getUserDataObserver(): void {
    if (this.postData && this.postData.author) {

      this.user$ = this.authFacade.token$.pipe(
        takeUntil(this.uns$),
        mergeMap(auth => this.searchService.findById(this.postData.author, auth.token))
      );
    }
  }

  getImages(): void {
    if (this.postData && this.postData.images?.length) {
      this.images = of(...this.postData.images)
        .pipe(
          takeUntil(this.uns$),
          mergeMap((img: string) => this.dropboxService.getLink(img)),
          reduce((acc: string[], val: string) => [...acc, val], [])
        );
    }
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
