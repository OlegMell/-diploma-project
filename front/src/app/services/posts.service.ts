import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpClient } from '@angular/common/http';
import { Post, TokenResult } from '../shared/models/common.models';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class PostsService extends ServerService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  create(post: Post, token: string): Observable<any> {
    return this.http.post(this.build('posts', 'create'), {
      ...post,
      author: jwt_decode<TokenResult>(token).sub
    }, {
      headers: this.setAuthorize(this.defaultHeaders(), token)
    });
  }

  getAll(token: string): Observable<any> {
    return this.http.get(this.build('posts', 'getAll'), {
      headers: this.setAuthorize(this.defaultHeaders(), token)
    });
  }
}
