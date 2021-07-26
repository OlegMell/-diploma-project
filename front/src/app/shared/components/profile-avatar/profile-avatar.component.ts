import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../../facades/auth-facade.service';
import { ThemeService } from '../../../services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { of, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { DropboxService } from '../../../services/dropbox.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: [ './profile-avatar.component.scss' ]
})
export class ProfileAvatarComponent implements OnInit, OnDestroy {

  private uns$: Subject<void> = new Subject<void>(); // unsubscribe all

  @Input() centerPosition = false; // флаг позиции компонента

  isProfileClicked = false; // флаг было ли нажатие на компонент
  isPhotoLoaded = false; // флаг загрузки фоto
  scrolled = false; // флаг скролла страницы
  photo!: string; // photo
  close = true; // флаг отображения
  user: any;

  constructor(public readonly authFacade: AuthFacadeService,
              public readonly themeService: ThemeService,
              private readonly searchService: SearchService,
              private readonly dropboxService: DropboxService,
              private readonly dialog: MatDialog,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params
      .pipe(
        takeUntil(this.uns$),
        mergeMap((params) => {
          if (!params.id) {
            return this.authFacade.photo$;
          }
          return of(params);
        }),
        mergeMap((params) => {
          if (typeof params === 'object') {
            return this.authFacade.token$.pipe(
              mergeMap((token) => this.searchService.findById(params.id, token)),
              mergeMap(user => {
                this.user = user;
                return this.dropboxService.getLink(user.personalInfo.photo);
              })
            );
          } else {
            return of(params);
          }
        }),
      )
      .subscribe(res => {
        this.photo = res;
        this.isPhotoLoaded = true;
      });

    // this.isPhotoLoaded = false;
    // this.authFacade.photo$
    //   .pipe(
    //     takeUntil(this.uns$),
    //     filter(value => value),
    //     tap(() => this.isPhotoLoaded = true))
    //   .subscribe(photo => this.photo = photo);
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

  @HostListener('body:click', [])
  onBodyClick(): void {
    this.isProfileClicked = false;
  }

  @HostListener('click', [ '$event' ])
  public onClick(event: any): void {
    event.stopPropagation();
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
    this.uns$.next();
    this.uns$.complete();
  }

}
