import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {
  constructor(private http: HttpClient) {}

  get<T>(
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

    return this.http.get<T>(url, {
      params: params ? httpParams : undefined,
      headers: { 'Content-Type': 'application/json' }
    });
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
    params?: any
  ): Observable<T> {

    let httpParams = new HttpParams();
    if (params){
       Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.put<T>(url, body ?? {}, {
      params: params ? httpParams : undefined,
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
