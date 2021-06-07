import { HttpService, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
    API_AUTH_URL = 'http://localhost:4000/api/auth';

    constructor(private readonly httpService: HttpService) {
    }

    signIn(login, password) {
        return this.httpService.get(`${ this.API_AUTH_URL }/signIn`, {
            params: `login=${ login }&password=${ password }`
        }).pipe(map(res => res.data))
    }

    signUp(account) {
        return this.httpService.post(`${ this.API_AUTH_URL }/signIn`, account)
            .pipe(map(res => res.data))
    }

}
