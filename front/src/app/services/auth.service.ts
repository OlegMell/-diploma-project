import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, CreateAccount, Credentials } from '../shared/models/common.models';
import { ServerService } from './server.service';
import { Md5 } from 'ts-md5';

@Injectable({ providedIn: 'root' })
export class AuthService extends ServerService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  // @ts-ignore
  public signIn({ login, password }): Observable<Auth> {
    return this.http.get<Auth>(this.build('auth', 'signIn'), {
      // params: this.buildReqParams({ login, password: Md5.hashStr(password) })
      params: this.buildReqParams({ login, password })
    });
  }

  public signUp(account: CreateAccount): Observable<Auth> {
    return this.http.post<Auth>(this.build('auth', 'signUp'), account);
  }

  public checkUser(auth: Auth): Observable<Auth> {
    return this.http.get<Auth>(this.build('auth', 'isAuth'), {
      params: this.buildReqParams(auth)
    });
  }
}
