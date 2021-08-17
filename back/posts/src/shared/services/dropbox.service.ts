import { HttpService, Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { API_DROPBOX_URL } from '../../config';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DropboxService {
  constructor(private readonly http: HttpService) {}

  getFileLink(path: string): Observable<any> {
    return this.http
      .get(`${API_DROPBOX_URL}link`, {
        params: { path },
      })
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
