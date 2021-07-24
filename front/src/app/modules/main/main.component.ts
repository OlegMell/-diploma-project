import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsFacadeService } from './services/posts-facade.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {

    this.postsFacade.getAll();

    // this.postsFacade.posts$.subscribe(posts => {
    //   console.log(posts);
    // });
  }

  ngOnDestroy(): void {
  }
}
