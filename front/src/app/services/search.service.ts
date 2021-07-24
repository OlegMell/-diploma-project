import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Сервис для работы с поисковыми запросами
 */
@Injectable({ providedIn: 'root' })
export class SearchService extends ServerService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Поиск пользователя
   * @param query поисковая строка
   * @param token авторизационный токен
   * @return Observable<any> объект response
   */
  findUsers(query: string, token: string): Observable<any> {
    return this.http.get(this.build('search', 'findUser'), {
      params: { query },
      headers: this.setAuthorize(this.defaultHeaders(), token)
    });
  }

  /**
   * Поиск пользователя по ID
   * @param id ID пользователя
   * @param token авторизационный токен
   * @return Observable<any> объект response
   */
  findById(id: string, token: string): Observable<any> {
    return this.http.get(this.build('search', 'findById'), {
      params: { id },
      headers: this.setAuthorize(this.defaultHeaders(), token)
    });
  }
}
