import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-write-post-btn',
  templateUrl: './write-post-btn.component.html',
  styleUrls: [ './write-post-btn.component.scss' ]
})
export class WritePostBtnComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик отвсех подписок

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
