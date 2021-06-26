import { HttpService, Injectable } from "@nestjs/common";
import { RequestService } from "../helpers/request.service";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as fs from "fs";

/**
 * Сервис для работы с DropBox API по HTTP
 */
@Injectable()
export class DropboxService {
    private DROPBOX_API_URL = 'https://api.dropboxapi.com/2/files/'; // url Dropbox Api
    private UPLOAD_DROPBOX_API_URL = 'https://content.dropboxapi.com/2/files/'; // url Dropbox Api

    constructor(private readonly http: HttpService,
                private readonly requestService: RequestService) {
    }

    /**
     * Получение временной ссылки на файл (4 часа)
     * @param path путь к файлу на dropbox
     */
    public getLink(path: string): Observable<string> {
        const url = `${ this.DROPBOX_API_URL }get_temporary_link`;
        return this.http.post(url, { path: `/${ path }` }, {
            headers: this.requestService.setDefaultHeaders()
        }).pipe(
            map(value => value.data.link)
        );
    }

    public async upload(file: Express.Multer.File): Promise<any> {
        const url = `${ this.UPLOAD_DROPBOX_API_URL }upload`;

        const s = fs.createWriteStream('./files/test1.jpg');
        // @ts-ignore
        s.write(Buffer.from(file.buffer.data));
        s.close();
        s.on('close', () => {
            console.log('end');


            this.http.post(url, fs.createReadStream('./files/test1.jpg'), {
                headers: this.requestService.setUploadHeaders()
            }).pipe(
                tap(e => {
                    console.log(e);
                }),
                map(r => r.status)
            ).subscribe(t => {
                console.log(t);
            })
        })

        return of('ok');
    }

    private createFile(file: Express.Multer.File): string {
        // console.log(file.buffer.data.toString());

        console.log();
        // @ts-ignore

        // s.end((r) => {
        //     console.log(r);
        // });

        // await s.close();
        return './files/test.jpg';
    }
}
