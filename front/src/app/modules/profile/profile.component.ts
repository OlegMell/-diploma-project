import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { PostsFacadeService } from '../main/services/posts-facade.service';
import { AuthFacadeService } from '../../shared/facades/auth-facade.service';
import { AppFacadeService } from '../../shared/facades/app-facade.service';
import { AuthService } from '../../services/auth.service';
import { Auth, FullPost } from '../../shared/models/common.models';
import { FollowsFacadeService } from '../../shared/facades/follows-facade.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок

  title = 'Профиль'; // загоовок страницы
  scrolled!: boolean; // флаг скролла страницы
  isAnotherUser!: boolean; // флаг не текущего пользователя
  posts!: FullPost[]; // массив постов пользователя
  id!: string; // Id пользователя из роута
  currentUserId!: string; // Id текущего пользователя

  constructor(private readonly route: ActivatedRoute,
              private readonly authFacade: AuthFacadeService,
              private readonly authService: AuthService,
              private readonly followsFacade: FollowsFacadeService,
              private readonly appFacade: AppFacadeService,
              public readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    this.getDataFromRoute();
    this.getCurrentUserId();
  }

  /**
   * Получение начальных данных станицы
   */
  getDataFromRoute(): void {
    this.route.params
      .pipe(
        takeUntil(this.uns$),
        filter((params: Params) => params.id),
        tap((params: Params) => this.id = params.id),
        mergeMap(() => this.postsFacade.userPosts$)
      ).subscribe((posts: FullPost[]) => {
      if (!posts.length) {
        this.postsFacade.getByAuthorId(this.id);
      }
    });
  }

  /**
   * Получение Айди текущего пользователя
   */
  getCurrentUserId(): void {
    this.authFacade.token$
      .pipe(takeUntil(this.uns$))
      .subscribe((auth: Auth) =>
        this.currentUserId = this.authService.getIdFromToken(auth.token as string));
  }

  /**
   * Установка подписки
   */
  follow(): void {
    this.followsFacade.setFollow({
      sourceUserId: this.currentUserId,
      targetUserId: this.id
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.pageYOffset > 48;
  }

  ngOnDestroy(): void {
    this.uns$.next();
    this.uns$.complete();
  }


}
