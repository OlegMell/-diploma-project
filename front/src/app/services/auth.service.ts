import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth, CreateAccount, Credentials, PersonalData, Profile } from '../shared/models/common.models';
import { ServerService } from './server.service';
import { Md5 } from 'ts-md5';
import jwt_decode from 'jwt-decode';
import { AuthState } from '../shared/store/shared.reducer';
import { Store } from '@ngrx/store';
import { selectAuth } from '../shared/selectors/auth.selectors';

export interface TokenResult {
  readonly id: string;
  readonly exp: number;
  readonly iat: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends ServerService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  // @ts-ignore
  public signIn({ login, password }): Observable<Auth> {
    return this.http.get<Auth>(this.build('auth', 'signIn'), {
      params: this.buildReqParams({ login, password: Md5.hashStr(password) })
      // params: this.buildReqParams({ login, password })
    });
  }

  public signUp(account: CreateAccount): Observable<Auth> {
    const acc = { ...account, password: Md5.hashStr(account.password) };
    return this.http.post<Auth>(this.build('auth', 'signUp'), acc);
  }

  public getUserProfile(token: string | undefined): Observable<PersonalData> {
    return this.http.get<PersonalData>(this.build('auth', 'getProfile'), {
      headers: this.setAuthorize(this.defaultHeaders(), token)
    });
  }

  public checkUser(auth: Auth): Observable<Auth> {
    return this.http.get<Auth>(this.build('auth', 'isAuth'), {
      params: this.buildReqParams(auth)
    });
  }

  public updatePersonaInfo(data: PersonalData, token: string): Observable<any> {
    console.log(data);
    return this.http.post(this.build('auth', 'updateProfile'), data, {
      headers: this.setAuthorize({}, token)
    });
  }

  public checkToken(): Observable<Auth> {
    const token = localStorage.getItem('access_token');
    let auth: Auth = {};
    if (token) {
      auth = {
        token
      };
    }
    return of(auth);
  }

  public getTokenExpirationDate(token: string): Date | null {
    const decoded = jwt_decode<TokenResult>(token);
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(accessToken: string): boolean {
    if (!accessToken) {
      return true;
    }
    const date = this.getTokenExpirationDate(accessToken);
    if (!date) {
      return true;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
