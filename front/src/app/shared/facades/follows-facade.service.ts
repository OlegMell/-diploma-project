import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { FollowDto } from '../models/common.models';
import { SetFollow } from '../store/shared.actions';

/**
 * Фасад-сервис для работы с подписками
 */
@Injectable({ providedIn: 'root' })
export class FollowsFacadeService {
  constructor(private readonly store: Store<AppState>) {
  }

  /**
   * Установка подписки/отписки
   */
  setFollow(followDto: FollowDto): void {
    this.store.dispatch(new SetFollow(followDto));
  }
}
