import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class DropboxService {

    constructor(private readonly http: HttpService) {
    }

    getTemporaryLink(path: string): Observable<any> {
        return this.http.get(`http://localhost:5500/dropbox/link?path=${ path }`);
    }
}
