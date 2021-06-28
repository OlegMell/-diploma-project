import { HttpService, Injectable } from "@nestjs/common";
import { RequestService } from "../helpers/request.service";
import { Observable, of, Subject } from "rxjs";
import { catchError, filter, map, mergeMap, tap } from "rxjs/operators";
import * as fs from "fs";

/**
 * Сервис для работы с DropBox API по HTTP
 */
@Injectable()
export class DropboxService {
    private DROPBOX_API_URL = 'https://api.dropboxapi.com/2/files/'; // url Dropbox Api
    private UPLOAD_DROPBOX_API_URL = 'https://content.dropboxapi.com/2/files/'; // url Dropbox Api

    private s: Subject<boolean> = new Subject<boolean>();

    constructor(private readonly http: HttpService,
                private readonly requestService: RequestService) {
    }

    /**
     * Получение временной ссылки на файл (4 часа)
     * @param path путь к файлу на dropbox
     */
    public getLink(path: string): Observable<string> {
        console.log('DDDD', path);
        const url = `${ this.DROPBOX_API_URL }get_temporary_link`;
        return this.http.post(url, { path: `${ path }` }, {
            headers: this.requestService.setDefaultHeaders()
        }).pipe(
            map(value => value.data.link),
            // catchError(() => of(null))
        );

    }

    public upload(file: Express.Multer.File): Observable<any> {
        const url = `${ this.UPLOAD_DROPBOX_API_URL }upload`;
        const arr = file.originalname.split('.');
        const modifiedName = arr[0] + new Date().getMilliseconds().toString();
        const fileName = modifiedName + '.' + arr[1];
        const filePath = `./files/${ fileName }`;
        const s = fs.createWriteStream(filePath);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        s.write(Buffer.from(file.buffer.data));
        s.close();
        s.on('close', () => {
            this.http.post(url, fs.createReadStream(filePath), {
                headers: this.requestService.setUploadHeaders(fileName)
            }).pipe(
                map((r) => r.data.name),
            ).subscribe();
        })

        // return this.s.pipe(
        //     filter(val => val),
        //     map(e => this.u(url, filePath, fileName))
        // );

        return of(`/profile-images/${ fileName }`);
    }

    u(url: string, filePath: string, fileName: string): any {
        return this.http.post(url, fs.createReadStream(filePath), {
            headers: this.requestService.setUploadHeaders(fileName)
        }).pipe(
            map((r) => r.data.name),
        )
    }
}
