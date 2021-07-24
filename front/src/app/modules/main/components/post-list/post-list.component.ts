import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostsFacadeService } from '../../services/posts-facade.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>();

  constructor(public readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
