import { Component, HostListener, OnInit } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: [ './searchbar.component.scss' ]
})
export class SearchbarComponent implements OnInit {
  private uns$: Subject<void> = new Subject<void>(); // отписчик отвсех подписок

  close = false; // флаг отображения панели результатов поиска
  scrolled = false; // флаг скролла страницы
  searchField = new FormControl('');

  constructor(public readonly appFacade: AppFacadeService) {
  }

  ngOnInit(): void {
    this.searchFieldValuesChanges();

    this.appFacade.foundUsers$.subscribe(u => {
      console.log(u);
    });
  }

  /**
   * Листенер ввода в поле поиска
   */
  searchFieldValuesChanges(): void {
    this.searchField.valueChanges
      .pipe(
        takeUntil(this.uns$),
        filter((query: string) => query.length >= 3),
        debounceTime(400))
      .subscribe((query: string) => this.appFacade.searchUsers(query));
  }

  /**
   * Очистка поля поиска
   */
  clearSearchField(): void {
    this.searchField.setValue('');
    this.appFacade.searchUsers('');
  }

  /**
   * Листенер клика по body для закрытия панели результатов
   */
  @HostListener('body:click', [])
  onBodyClick(): void {
    this.close = false;
  }

  /**
   * Листенер скролла страницы
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.pageYOffset > 48;
  }

  /**
   * Листенер клика по компоненту для предотвращения всплытия события
   * @param e объект события
   */
  @HostListener('click', [ '$event' ])
  public onClick(e: Event): void {
    e.stopPropagation();
  }

  /**
   * Листенер клика по инпуту для открытия панели результатов
   * @param e объект события
   */
  openPanel(e: Event): void {
    e.stopPropagation();
    this.close = true;
  }


}
