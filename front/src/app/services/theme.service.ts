import { HostBinding, Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ThemeService {

  static currentTheme = 'light';

  constructor() {
  }

  toggleTheme(): void {

    if (ThemeService.currentTheme === 'dark') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      ThemeService.currentTheme = 'light';
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      ThemeService.currentTheme = 'dark';
    }
  }
}
