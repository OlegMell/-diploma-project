import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';
import { DropboxService } from '../../../services/dropbox.service';
import { FoundUser } from '../../models/common.models';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-small-user',
  templateUrl: './small-user.component.html',
  styleUrls: [ './small-user.component.scss' ]
})
export class SmallUserComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  @Input() user!: FoundUser; // текущий найденный пользователь
  @Input() user$!: Observable<FoundUser>; // текущий найденный пользователь
  @Input() photo!: string; // текущий найденный пользователь
  @Input() username!: string; // текущий найденный пользователь
  @Input() link!: string; // ссылка на картинку из дропбокса

  constructor(public readonly appFacade: AppFacadeService,
              private readonly dropbox: DropboxService) {
  }

  /**
   * Инициализация
   */
  ngOnInit(): void {
    this.link = this.photo;
    // this.getImageLink(); // запуск листенера получения ссылки
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
    } else if (this.user$) {
      this.user$.pipe(
        takeUntil(this.uns$),
        tap(() => console.log('PHOTOS')),
        mergeMap(user => this.dropbox.getLink(user.personalInfo.photo))
      ).subscribe(link => this.link = link);
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
