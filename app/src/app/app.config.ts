import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export interface IAppConfig {
  apiBaseURL: string  
  apiBaseCatalog: string
  apiBaseCard: string
}

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');

const configValue: IAppConfig = {
  apiBaseURL: 'https://w7ykg0p614.execute-api.us-east-2.amazonaws.com/prod',
  apiBaseCatalog: 'https://cbjzbu9fq5.execute-api.us-east-2.amazonaws.com/dev',
  apiBaseCard: 'https://7a3snz44o7.execute-api.us-east-2.amazonaws.com/prod'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: APP_CONFIG, useValue: configValue },
    provideHttpClient()
  ]
};
