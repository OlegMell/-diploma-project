import { Component } from '@angular/core';
import { AppFacade } from '../../facades/app.facade';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: [ './preloader.component.scss' ]
})
export class PreloaderComponent {
  constructor(public appFacade: AppFacade) {
  }
}
