import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';
import { DropboxService } from '../../../services/dropbox.service';
import { FoundUser } from '../../models/common.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-small-user',
  templateUrl: './small-user.component.html',
  styleUrls: [ './small-user.component.scss' ]
})
export class SmallUserComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  @Input() user!: FoundUser; // текущий найденный пользователь
  public link!: string; // ссылка на картинку из дропбокса

  constructor(public readonly appFacade: AppFacadeService,
              private readonly dropbox: DropboxService) {
  }

  /**
   * Инициализация
   */
  ngOnInit(): void {
    this.getImageLink(); // запуск листенера получения ссылки
  }

  /**
   * Листенер получения ссылки на картинку пользователя если он есть
   */
  getImageLink(): void {
    if (this.user && this.user.personalInfo) {
      this.dropbox
        .getLink(this.user.personalInfo.photo)
        .pipe(takeUntil(this.uns$))
        .subscribe((link: string) => this.link = link);
    }
  }

  /**
   * Финализация
   */
  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }
}
