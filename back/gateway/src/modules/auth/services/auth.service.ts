import { HttpService, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreateAccount } from "../models/create-account.model";
import { JwtToken } from "../models/jwt-token.model";

@Injectable()
export class AuthService {
    API_AUTH_URL = 'http://localhost:4000/api/auth';

    constructor(private readonly httpService: HttpService) {
    }

    signIn({ login, password }): Observable<JwtToken> {
        return this.httpService.get(`${ this.API_AUTH_URL }/signIn?login=${ login }&password=${ password }`)
            .pipe(map(res => res.data));
    }

    signUp(account: CreateAccount): Observable<JwtToken> {
        return this.httpService.post(`${ this.API_AUTH_URL }/signIn`, account)
            .pipe(map(res => res.data));
    }

    getProfile(token: string): any {
        return this.httpService.get(`${ this.API_AUTH_URL }/getProfile`, {
            headers: {
                'Authorization': token
            }
        })
            .pipe(map(res => res.data));
    }

}
