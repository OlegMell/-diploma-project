import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostsFacadeService } from '../../../modules/main/services/posts-facade.service';
import { FullPost, PostWithAuthorData } from '../../models/common.models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>();
  @Input() posts!: PostWithAuthorData[];
  constructor(public readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    console.log(this.posts);
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
