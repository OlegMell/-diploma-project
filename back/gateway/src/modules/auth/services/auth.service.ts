import { HttpService, Injectable } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CreateAccount } from "../models/create-account.model";
import { JwtToken } from "../models/jwt-token.model";
import { API_AUTH_URL } from "../../../config/microservices-endpoints.config";

/**
 * Сервис для работы с микросервисом авторизации пользователя
 */

@Injectable()
export class AuthService {

    constructor(private readonly httpService: HttpService) {
    }

    /**
     * Запрос на авторизацию
     * @param login емайл/username
     * @param password захешированный пароль
     */
    signIn({ login, password }): Observable<JwtToken> {
        return this.httpService.get(`${ API_AUTH_URL }auth/signIn?login=${ login }&password=${ password }`)
            .pipe(map(res => res.data));
    }


    /**
     * Запрос на регистрацию
     * @param account данные для регистрации
     */
    signUp(account: CreateAccount): Observable<JwtToken> {
        return this.httpService.post(`${ API_AUTH_URL }auth/signIn`, account)
            .pipe(map(res => res.data));
    }

    /**
     * Запрос на получение личных данных авторизированного пользователя по токену
     * @param token токен пользователя
     */
    getProfile(token: string): any {
        return this.httpService.get(`${ API_AUTH_URL }auth/getProfile`, {
            headers: {
                'Authorization': token
            }
        })
            .pipe(map(res => res.data));
    }

    /**
     * Запрос на редактирование данных поьзователя
     * @param data данные для обновления
     * @param token токен авторизированного пользователя
     */
    updateProfileData(data: any, token: string): Observable<any> {
        return this.httpService.post(`${ API_AUTH_URL }auth/updateProfile`, data,{
            headers: {
                'Authorization': token,
            }
        })
            .pipe(map(res => res.data));
    }

}
