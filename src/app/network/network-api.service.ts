import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class NetworkApiService {

  BASE_URL = 'https://api.github.com/gists/public';

  constructor(private http: HttpClient) { }

  getData(pageNo, perPageCount) {
    const params = new HttpParams({fromObject: {page: '' + pageNo, per_page: String(perPageCount) }});
    return this.http.get<GistModel[]>(this.BASE_URL, {params: params}).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
