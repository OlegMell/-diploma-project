import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  @Input() currTitle: string | undefined; // текущий заголовок станицы
  scrolled = false; // флаг скролла страницы

  constructor(private readonly route: ActivatedRoute,
              private readonly authFacade: AuthFacadeService) {
  }

  ngOnInit(): void {
    this.authFacade.getCurrentUserId(this.route)
      .pipe(takeUntil(this.uns$))
      .subscribe(id => {
        console.log(id);
      });
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }

}
