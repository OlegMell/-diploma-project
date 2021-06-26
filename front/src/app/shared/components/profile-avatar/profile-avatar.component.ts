import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { ThemeService } from '../../../services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: [ './profile-avatar.component.scss' ]
})
export class ProfileAvatarComponent implements OnInit, OnDestroy {

  isProfileClicked = false; // флаг было ли нажатие на компонент
  @Input() centerPosition = false; // флаг позиции компонента
  scrolled = false; // флаг скролла страницы

  constructor(public readonly authFacade: AuthFacadeService,
              public readonly themeService: ThemeService,
              private readonly dialog: MatDialog) {
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.pageYOffset > 48;
  }

  /**
   * Листенер нажатия на кнопку редактиования профиля
   */
  editProfile(): void {
    this.dialog.open(EditProfileDialogComponent, {
      width: '600px',
      height: '650px',
    });
  }

  ngOnDestroy(): void {
  }

}
