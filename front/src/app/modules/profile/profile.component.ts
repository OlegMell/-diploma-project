import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { PostsFacadeService } from '../main/services/posts-facade.service';
import { AuthFacadeService } from '../../shared/facades/auth-facade.service';
import { AppFacadeService } from '../../shared/facades/app-facade.service';
import { AuthService } from '../../services/auth.service';
import { FullPost } from '../../shared/models/common.models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок

  title = 'Профиль';
  scrolled!: boolean;
  isAnotherUser!: boolean;
  posts!: FullPost[];
  id!: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly authFacade: AuthFacadeService,
              private readonly authService: AuthService,
              private readonly appFacade: AppFacadeService,
              public readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.uns$),
        filter((params: Params) => params.id),
        tap((params: Params) => this.id = params.id),
        mergeMap((params: Params) => this.postsFacade.userPosts$)
      ).subscribe((posts: FullPost[]) => {
      if (!posts.length) {
        this.postsFacade.getByAuthorId(this.id);
      }
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
