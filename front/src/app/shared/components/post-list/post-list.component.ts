import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostsFacadeService } from '../../../modules/main/services/posts-facade.service';
import { PostWithAuthorData } from '../../models/common.models';

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
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
