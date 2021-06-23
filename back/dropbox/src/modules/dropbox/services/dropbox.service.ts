import { HttpService, Injectable } from "@nestjs/common";
import { RequestService } from "../helpers/request.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**
 * Сервис для работы с DropBox API по HTTP
 */
@Injectable()
export class DropboxService {
    DROPBOX_API_URL = 'https://api.dropboxapi.com/2/files/';
    DROPBOX_API_TOKEN = 'qS9CWBwaggkAAAAAAAAAATF1Pq1UtUAWciy7ATEZNxiT65d--tF23-qjUBsfpK01';

    constructor(private readonly http: HttpService,
                private readonly requestService: RequestService) {
    }

    /**
     * Получение временной ссылки на файл (4 часа)
     */
    public getLink(path: string): Observable<string> {
        const url = `${ this.DROPBOX_API_URL }get_temporary_link`;
        return this.http.post(url, { path: `/${ path }` }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ this.DROPBOX_API_TOKEN }`
            }
        }).pipe(
            map(value => value.data.link)
        );
    }
}
