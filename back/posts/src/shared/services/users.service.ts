import { HttpService, Injectable } from '@nestjs/common';
import { GetAuthorDataByIdDto } from '../models/dtos/getAuthorDataById.dto';
import { API_AUTH_URL } from '../../config';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  getAuthorDataById(getAuthorData: GetAuthorDataByIdDto): Observable<any> {
    return this.http
      .get(`${API_AUTH_URL}search/findById`, {
        params: { ...getAuthorData },
      })
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
