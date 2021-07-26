import { HttpService, Injectable } from "@nestjs/common";
import { CreatedPostRes, CreatePostReq } from "../models/dtos/posts.dtos";
import { Observable } from "rxjs";
import { API_POSTS_URL } from "../../../config/microservices-endpoints.config";
import { map } from "rxjs/operators";


/**
 * Сервис для работы с микросервисом постов
 */
@Injectable()
export class PostsService {
    constructor(private readonly http: HttpService) {
    }

    /**
     * Создание поста
     * @param post новый пост
     */
    public create(post: CreatePostReq): Observable<CreatedPostRes> {
        return this.http.post<CreatedPostRes>(`${ API_POSTS_URL }posts/create`, post).pipe(
            map((res) => res.data)
        );
    }

    /**
     * Запрос на получение постов
     */
    public getAll(): any {
        return this.http.get(`${ API_POSTS_URL }posts/getAll`).pipe(
            map(res => res.data)
        );
    }

    /**
     * Запрос на получение постов по ID автора поста
     * @param query
     */
    public getByAuthorId(query: { id: string }): any {
        return this.http.get(`${ API_POSTS_URL }posts/getByAuthorId`, {
            params: { ...query }
        }).pipe(
            map(res => res.data)
        )
    }
}
