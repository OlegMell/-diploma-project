import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsFacadeService } from './services/posts-facade.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit, OnDestroy {
  posts: any;

  constructor(public readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
        this.postsFacade.getAll();
    // this.postsFacade.posts$.subscribe(posts => {
    //   if (!posts.length) {
    //   }
    // });
  }

  ngOnDestroy(): void {
  }
}
