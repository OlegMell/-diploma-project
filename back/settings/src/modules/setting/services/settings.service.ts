import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../../../shared/repositories/settings.repository';
import { EditReq } from '../models/dtos/settings.dtos';

/**
 * Сервис настроек
 */
@Injectable()
export class SettingsService {
  constructor(private readonly settingsRepos: SettingsRepository) {}

  /**
   * Получения настроек
   */
  public getAll(): any {
    return this.settingsRepos.getAll();
  }

  /**
   * Изменение настроек
   * @param editReq обьект изменения настроек
   */
  public edit(editReq: EditReq): any {
    return this.settingsRepos.edit(editReq);
  }
}
