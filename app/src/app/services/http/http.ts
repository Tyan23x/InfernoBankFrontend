import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any) {
    return this.http.get<T>(url, options);
  }

  post<T>(
    url: string,
    body?: any,
    params?: { [key: string]: string }
  ): Observable<T> {

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.post<T>(url, body ?? {}, {
      params: params ? httpParams : undefined,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  put<T>(
    url: string,
    body: any,
    options?: any
  ): Observable<T> {

    let httpParams = new HttpParams();
    if (options){
       Object.keys(options).forEach(key => {
        httpParams = httpParams.set(key, options[key]);
      });
    }

    return this.http.post<T>(url, body ?? {}, {
      params: options ? httpParams : undefined,
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
