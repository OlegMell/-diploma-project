import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacadeService } from './shared/facades/app-facade.service';
import { Subject } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок

  constructor(private appFacade: AppFacadeService,
              private themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
