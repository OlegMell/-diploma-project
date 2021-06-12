import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

const REQUESTS = {
  auth: {
    root: 'auth',
    child: {
      signIn: '/signIn',
      signUp: '/signUp',
      isAuth: '/isAuth',
    }
  }
};

export class ServerService {
  protected build(entry: any, value: any): string {
    // @ts-ignore
    const child = value ? REQUESTS[entry].child[value] : '';
    // @ts-ignore
    return environment.apiEndPoint + REQUESTS[entry].root + child;
  }

  protected buildReqParams(data: any): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key]) {
        httpParams = httpParams.append(key, data[key]);
      }
    });

    console.log(httpParams);

    return httpParams;
  }

  protected defaultHeaders(): any {
    return { 'Content-Type': 'application/json' };
  }

  protected defaultOptions(): any {
    return {
      headers: this.defaultHeaders()
    };
  }
}
