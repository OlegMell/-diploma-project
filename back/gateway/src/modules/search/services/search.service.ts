import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { FoundUsers, SearchRequestQuery } from "../models/dtos/search-response.models";
import { API_AUTH_URL } from "../../../config/microservices-endpoints.config";
import { map } from "rxjs/operators";

/**
 * Сервис для работы поиска в приложении
 */
@Injectable()
export class SearchService {
    constructor(private readonly http: HttpService) {
    }

    /**
     * Поиск пользователей по строке
     * @param query объект со строкой поиска
     */
    public searchUser(query: SearchRequestQuery): Observable<FoundUsers> {
        return this.http.get<FoundUsers>(`${ API_AUTH_URL }search/findUsers`, {
            params: query
        }).pipe(
            map((res) => res.data)
        );
    }
}
