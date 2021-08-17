import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Auth, FollowDto } from '../shared/models/common.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FollowsService extends ServerService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Запрос на подписку
   */
  setFollow(followDto: FollowDto, auth: Auth): Observable<any> {
    return this.http.patch<string>(this.build('follows', 'setFollow'), {
      ...followDto
    }, {
      headers: this.setAuthorize(this.defaultHeaders(), auth.token)
    });
  }
}
