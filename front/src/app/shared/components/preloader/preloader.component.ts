import { Component, Input } from '@angular/core';
import { AppFacadeService } from '../../facades/app-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: [ './preloader.component.scss' ]
})
export class PreloaderComponent {
  @Input() diameter!: number; // размер крутилки
  @Input() center!: boolean; // размер крутилки
  @Input() pendingFactor!: Observable<boolean>; // флаг загрузки

  constructor(public readonly appFacade: AppFacadeService) {
  }
}
