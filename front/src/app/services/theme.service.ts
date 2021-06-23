import { Injectable } from '@angular/core';
import { AppFacadeService } from '../shared/facades/app-facade.service';
import { Themes } from '../shared/models/common.models';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../shared/store/shared.reducer';
import { SetTheme } from '../shared/store/shared.actions';

/**
 * Сервис для работы с темой приложения
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Отписчик от всех подписок */
  private uns$: Subject<void> = new Subject<void>();

  /** текущая тема */
  currentTheme: Themes = Themes.LIGHT;

  constructor(private readonly appFacade: AppFacadeService,
              private readonly store$: Store<AuthState>) {

    appFacade.theme$
      .pipe(takeUntil(this.uns$))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.setTheme();
      });

    this.observeBrowserThemeChanges(); // запуск листенера изминения темы браузера
  }

  /**
   * Переключение темы приложения
   */
  toggleTheme(): void {

    if (this.currentTheme === 'dark') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      this.store$.dispatch(new SetTheme(Themes.LIGHT));
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      this.store$.dispatch(new SetTheme(Themes.DARK));
    }

  }

  /**
   * Установка темы приложения
   */
  private setTheme(): void {
    if (this.currentTheme === Themes.DARK) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  /**
   * Листенер изминения темы браузера
   */
  private observeBrowserThemeChanges(): void {
    fromEvent(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
      .pipe(takeUntil(this.uns$))
      .subscribe((t) => {
        // @ts-ignore
        t.matches ? this.store$.dispatch(new SetTheme(Themes.DARK)) : this.store$.dispatch(new SetTheme(Themes.LIGHT));
      });
  }

  /**
   * Геттер текущей темы
   */
  get getCurrentTheme(): string {
    return this.currentTheme;
  }
}
