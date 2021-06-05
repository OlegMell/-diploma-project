import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, CreateAccount, Credentials } from '../shared/models/common.models';
import { ServerService } from './server.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends ServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public signIn(credentials: Credentials): Observable<Auth> {
    return this.http.get<Auth>(this.build('auth', 'signIn'), {
      params: this.buildReqParams(credentials)
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
