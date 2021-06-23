import { Component } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: [ './preloader.component.scss' ]
})
export class PreloaderComponent {
  constructor(public appFacade: AppFacadeService) {
  }
}
