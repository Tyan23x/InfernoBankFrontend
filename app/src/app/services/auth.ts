import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '../services/http/http';
import { APP_CONFIG } from '../app.config';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private httpService = inject(Http);
  private config = inject(APP_CONFIG);

  login(email: string, password: string) {
    const body = { email, password };
    return this.httpService.post(`${this.config.apiBaseURL}/login`, body).pipe(
      catchError(err => throwError(() => err))
    );
  }

  register(name: string, lastName: string, email: string, document: string, password: string) {
    const body = { name, lastName, email, password, document };
    return this.httpService.post(`${this.config.apiBaseURL}/register`, body).pipe(
      catchError(err => throwError(() => err))
    );
  }

  update(address: string, phone: string, document: string) {
    const body = { address, phone };
    return this.httpService.put(`${this.config.apiBaseURL}/profile/${document}`, body).pipe(
      catchError(err => throwError(() => err))
    );
  }

  updateGet(document: string) {
    return this.httpService.get(`${this.config.apiBaseURL}/profile/${document}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCatalog() {
    return this.httpService.get(`${this.config.apiBaseCatalog}/catalog`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCard(cardid: string) {
    return this.httpService.get(`${this.config.apiBaseCard}/Transaction/card/${cardid}`).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
