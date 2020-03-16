import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IRequestEdit } from '../models/request-edit';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { catchError, map, tap } from 'rxjs/operators';
import { IRequestAdd } from '../models/request-add';

const API_URL = '{INJECT_API_URL}';

@Injectable({
  providedIn: 'root'
})
export class ChangeRequestService {

  constructor(
    private http: HttpClient,
    private optionsService: HttpOptionsService
  ) { }

  getRequests(): Observable<IRequestEdit[]> {
    const options = this.optionsService.setOptions();
    return this.http
               .get<IRequestEdit[]>(API_URL, options)
               .pipe(
                  tap(
                    (_) => this.optionsService.log('getRequests'),
                    catchError(this.optionsService.handleError('getRequests', [])),
                  ),
               );
  }

  getRequest(requestId: string): Observable<IRequestEdit> {
    const options = this.optionsService.setOptions();
    return this.http
               .get<IRequestEdit>(`${API_URL}/${requestId}`, options)
               .pipe(
                tap(
                  (_) => this.optionsService.log('getRequest'),
                  catchError(this.optionsService.handleError('getRequest', [])),
                ),
             );
  }

  postRequest(item: IRequestAdd): Observable<IRequestEdit> {
    const body = JSON.stringify(item);
    const options = this.optionsService.setOptions();
    return this.http
               .post<IRequestEdit>(API_URL, body, options)
               .pipe(
                  tap(
                    (_) => this.optionsService.log('postRequest'),
                    catchError(this.optionsService.handleError('postRequest', [])),
                  ),
               );
  }

  putRequest(requestId: string, item: IRequestAdd): Observable<void> {
    const body = JSON.stringify(item);
    const options = this.optionsService.setOptions();
    return this.http
               .put<void>(`${API_URL}/${requestId}`, body, options)
               .pipe(
                tap(
                  (_) => this.optionsService.log('putRequest'),
                  catchError(this.optionsService.handleError('putRequest', [])),
                ),
             );
  }
}
