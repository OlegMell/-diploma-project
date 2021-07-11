import { Component, Input } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: [ './preloader.component.scss' ]
})
export class PreloaderComponent {
  @Input() diameter!: number; // размер крутилки

  constructor(public readonly appFacade: AppFacadeService) {
  }
}
