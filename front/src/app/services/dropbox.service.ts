import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, reduce, scan } from 'rxjs/operators';


/**
 * Сервис для работы с Dropbox HTTP API
 */
@Injectable({ providedIn: 'root' })
export class DropboxService {
  private DROPBOX_API_URL = 'https://api.dropboxapi.com/2/files/'; // url Dropbox Api
  private UPLOAD_DROPBOX_API_URL = 'https://content.dropboxapi.com/2/files/'; // url Dropbox Files Api
  private DROPBOX_API_TOKEN = 'qS9CWBwaggkAAAAAAAAAATF1Pq1UtUAWciy7ATEZNxiT65d--tF23-qjUBsfpK01'; // Dropbox Api Token

  constructor(private readonly http: HttpClient) {
  }

  /**
   * Получение временной ссылки на файл (4 часа)
   * @param path путь к файлу на dropbox
   */
  public getLink(path: string): Observable<string> {
    const url = `${ this.DROPBOX_API_URL }get_temporary_link`;

    return this.http.post(url, { path: `${ path }` }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ this.DROPBOX_API_TOKEN }`
      }
    }).pipe(
      // @ts-ignore
      map((res: { metadata: any, link: string }) => res.link),
      catchError((e) => {
        if (e.status === 409) {
          return 'Картинка не найдена!';
        }

        return 'Unknown Error';
      })
    );
  }

  /**
   * Отправка файла на Dropbox
   * @param file файл для загрузки
   * @param partPath начальная часть пути (директория)
   */
  public uploadFile(file: File, partPath: string = '/profile-images/'): Observable<string> {
    // если файл есть, то загружаем и возвращаем путь файла на Dropbox
    if (file) {
      const url = `${ this.UPLOAD_DROPBOX_API_URL }upload`;

      const arr = file.name.split('.');
      const modifiedName = arr[0] + new Date().getMilliseconds().toString();
      const fileName = modifiedName + '.' + arr[1];

      const path = `${partPath}${ fileName }`;

      return this.http.post(url, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': `{"path": "${ path }", "mode": "add", "autorename": true,"mute": false,"strict_conflict": false}`,
          Authorization: `Bearer ${ this.DROPBOX_API_TOKEN }`
        }
      }).pipe(
        // @ts-ignore
        map((res) => res.path_lower),
      );
      // иначе возвращаем пустую строку
    } else {
      return of('');
    }
  }

  uploadFilesArray(files: FileList): Observable<string[]> {
    // return of(...Array.from(files)).pipe(
    //   mergeMap(file => this.uploadFile(file, '/posts-images/')),
    //   scan((acc: string[], img: string) => [...acc, img], [])
    // );

    return of([]);
  }
}
