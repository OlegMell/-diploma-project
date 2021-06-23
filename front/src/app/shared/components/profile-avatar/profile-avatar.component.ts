import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: [ './profile-avatar.component.scss' ]
})
export class ProfileAvatarComponent implements OnInit, OnDestroy {

  isProfileClicked = false; // флаг было ли нажатие на компонент
  @Input() centerPosition = false; // флаг позиции компонента

  constructor(public readonly authFacade: AuthFacadeService,
              readonly themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  /**
   * Листенер нажатия на кнопку выхода из аккаунта
   */
  logout(): void {
    this.authFacade.logout();
  }

  /**
   * Листенер смены темы
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  ngOnDestroy(): void {
  }
}
