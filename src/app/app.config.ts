import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppErrorHandler } from './app-error-handler';

import { routes } from './app.routes';
import { APP_SETTINGS, appSettings } from './app.settings';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: APP_SETTINGS, useValue: appSettings },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
};
