/***
 * Модель настроек
 */
export interface SettingsDto {
  theme: boolean;
  notification: boolean;
  font_size: number;
  language: string;
}
/***
 * Модель с запросами на изменение
 */
export interface EditReq {
  id: string;
  key: string;
  value: any;
}
