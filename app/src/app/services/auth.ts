import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '../services/http/http';
import { APP_CONFIG } from '../app.config';
import { catchError, throwError } from 'rxjs';

interface LoginResponse {
  token?: string;
  message?: string;
}

interface RegisterResponse {
  userId?: string;
  message?: string;
}

interface UpdateResponse {
  userId?: string;
  message?: string;
}

interface UpdateGetResponse {
  userId?: string;
  message?: string;
}



export function auth() {
  const http = inject(HttpClient);
  const config = inject(APP_CONFIG);
  const httpService = inject(Http);

  return {
    login: (email: string, password: string) => {
      const body = { email, password };
      return httpService.post<LoginResponse>(`${config.apiBaseURL}/login`,  body ).pipe(
        catchError(err => {
          console.error('Error en login:', err);
          return throwError(() => err);
        })
      );
    },

    register: (name: string, lastName: string, email: string, document: string, password: string) => {
      const body = { name, lastName, email, password, document };
      return httpService.post<RegisterResponse>(`${config.apiBaseURL}/register`,  body ).pipe(
        catchError(err => {
          console.error('Error en register:', err);
          return throwError(() => err);
        })
      );
    },

    update: (address: string, phone: string, document: string) => {
      console.log('desde auth, document: ', document);
      const body = { address, phone};
      return httpService.put<UpdateResponse>(`${config.apiBaseURL}/profile/${document}`,  body ).pipe(
        catchError(err => {
          console.error('Error en actualizar:', err);
          return throwError(() => err);
        })
      );
    }, 

    updateGet: (document: string) => {
      console.log('desde auth, document: ', document);
      return httpService.get<UpdateGetResponse>(`${config.apiBaseURL}/profile/${document}`, ).pipe(
        catchError(err => {
          console.error('Error en actualizar:', err);
          return throwError(() => err);
        })
      );
    }, 

    getCatalog: () => {
      return httpService.get<UpdateGetResponse>(`${config.apiBaseCatalog}/catalog`, ).pipe(
        catchError(err => {
          console.error('Error en actualizar:', err);
          return throwError(() => err);
        })
      );
    }
  };
}
