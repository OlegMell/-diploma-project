import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { PostsFacadeService } from '../main/services/posts-facade.service';
import { AuthFacadeService } from '../../shared/facades/auth-facade.service';
import { AppFacadeService } from '../../shared/facades/app-facade.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  private uns$: Subject<void> = new Subject<void>(); // отписчик от всех подписок
  public scrolled!: boolean;
  title = 'Профиль';
  isAnotherUser!: boolean;

  constructor(private readonly route: ActivatedRoute,
              private readonly authFacade: AuthFacadeService,
              private readonly authService: AuthService,
              private readonly appFacade: AppFacadeService,
              private readonly postsFacade: PostsFacadeService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.uns$),
        mergeMap((params: Params) => {
          if (!params.id) {
            return this.authFacade.token$
              .pipe(
                map(auth => this.authService.getIdFromToken(auth.token))
              );
          }
          this.isAnotherUser = true;
          return of(params.id);
        })
      )
      .subscribe((id: string) => {
        this.postsFacade.getByAuthorId(id);
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
