import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor() { }

  public setOptions(parameters?: any, observe = 'body', patch = false) {
    const headers = new HttpHeaders({ 'Content-Type': patch ? 'application/json-patch+json' : 'application/json' });
    const params = !!(parameters !== null && parameters !== undefined) ? Object.getOwnPropertyNames(parameters)
      .filter((s) => parameters[s] !== null && parameters[s] !== undefined)
      .reduce((p, key) => p.set(key, parameters[key]), new HttpParams()) : {};
    const options = {
      headers,
      params,
      observe: observe as 'body'
    };
    return options;
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public log(message: string) {
    console.log(message);
  }
}
