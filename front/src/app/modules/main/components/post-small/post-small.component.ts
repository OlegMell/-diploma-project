import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FullPost } from '../../../../shared/models/common.models';
import { Subject } from 'rxjs';
import { SearchService } from '../../../../services/search.service';
import { AuthFacadeService } from '../../../../shared/facades/auth-facade.service';
import { mergeMap } from 'rxjs/operators';
import { DropboxService } from '../../../../services/dropbox.service';

@Component({
  selector: 'app-post-small',
  templateUrl: './post-small.component.html',
  styleUrls: [ './post-small.component.scss' ]
})
export class PostSmallComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>();
  @Input() postData!: FullPost;
  user$!: any;

  constructor(private readonly searchService: SearchService,
              private readonly dropboxService: DropboxService,
              private readonly authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.getUserDataObserver();
  }

  getUserDataObserver(): void {
    if (this.postData && this.postData.author) {

      this.user$ = this.authFacade.token$.pipe(
        mergeMap(auth => this.searchService.findById(this.postData.author, auth.token))
      );
    }
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
