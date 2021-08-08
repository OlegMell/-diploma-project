import { Injectable } from '@angular/core';
import { SERVER_ERRORS_MESSAGES } from '../constants/snack-messages.constants';
import { SnackbarService } from './toastr.service';

/**
 * Сервис отображения ошибки
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorCatchService {

  constructor(private readonly snackBarService: SnackbarService) {
  }

  /**
   * Проверка ошибки
   * @param err объект ошибки
   */
  public checkError(err: any): void {
    this.snackBarService.open(SERVER_ERRORS_MESSAGES.SERVER_IS_NOT_RESPONDING);
  }
}
