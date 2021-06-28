import { Themes } from '../models/common.models';

export class ThemeHelper {
  static fromString(value: string): Themes {
    switch (value) {
      case 'dark':
        return Themes.DARK;
      case 'light':
        return Themes.LIGHT;
      default:
        return Themes.LIGHT;
    }
  }
}
