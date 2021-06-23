import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Сервис для работы со снекбаром
 */
@Injectable()
export class SnackbarService {
  /** Длительность показа сообщения по-умолчанию */
  private defaultDuration = 3000;

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * Открыть снекбар
   * @param message текст сообщеия
   * @param duration длительность показа сообщения в миллисекундах
   */
  open(message: string, duration: number = this.defaultDuration): void {
    this.snackBar.open(message, '', {
      duration: this.defaultDuration
    });
  }
}
