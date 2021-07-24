import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsFacadeService {
  post$!: Subject<any>;

  constructor() {
  }

  public createPost(text: string): void {

  }

}
