import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * Сервис для работы с Dropbox микросервисом
 */
@Injectable()
export class DropboxService {

    private DROPBOX_API_URL = 'http://localhost:5500/dropbox/';

    constructor(private readonly http: HttpService) {
    }

    /**
     * Запрос на получение ссылки на файл по пути
     * @param path путь к файлу на dropbox
     */
    getTemporaryLink(path: string): Observable<any> {
        return this.http.get(`${ this.DROPBOX_API_URL }link?path=${ path }`);
    }

    /**
     * Запрос на загрузку файла
     * @param file загружаемый файл
     */
    uploadFile(file: Express.Multer.File): Observable<any> {
        return this.http.post(`${ this.DROPBOX_API_URL }upload`, { file });
    }

}
