import { HttpService, Injectable } from "@nestjs/common";
import { CreatedPostRes, CreatePostReq, GetByAuthorIdDto, RemoveReqDto } from "../models/dtos/posts.dtos";
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
    public getAll(a: string): any {
        return this.http.get(`${ API_POSTS_URL }posts/getAll`, {
            headers: {
                Authorization: a
            }
        }).pipe(
            map(res => res.data)
        );
    }

    /**
     * Запрос на получение постов по ID автора поста
     * @param query Объект с ID автора
     */
    public getByAuthorId(query: GetByAuthorIdDto): any {
        return this.http.get(`${ API_POSTS_URL }posts/getByAuthorId`, {
            params: { ...query }
        }).pipe(
            map(res => res.data)
        )
    }

    /**
     * Запрос а удаление поста
     * @param query Объект с ID поста
     */
    public remove(query: RemoveReqDto): any {
        return this.http.get(`${ API_POSTS_URL }posts/removePost`, {
            params: { ...query }
        }).pipe(
            map(res => res.data)
        )
    }

    /**
     * Отправка запроса на отметку "Лайк"
     */
    public setLike(token: string, postId: any): any {
        return this.http.put(`${ API_POSTS_URL }posts/setLike`, {
            token, ...postId
        }).pipe(
            map(res => res.data)
        )
    }
}
