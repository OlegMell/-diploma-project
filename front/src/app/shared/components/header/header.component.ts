import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { Subject } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  @Input() title: string | undefined; // текущий заголовок страницы
  scrolled = false;

  constructor(private readonly authFacade: AuthFacadeService,
              readonly themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll(): void {
  //   this.scrolled = window.pageYOffset > 48;
  // }

  ngOnDestroy(): void {
  }
}
