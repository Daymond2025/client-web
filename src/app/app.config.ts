import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { importProvidersFrom } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
// import { provideBrowserApp } from '@angular/platform-browser';


import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

export const appConfig: ApplicationConfig = {
 
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        },
        ripple: true
    }),
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // Utiliser la locale française
    provideHttpClient(),
    importProvidersFrom(
      CardModule,
      ButtonModule,
      SharedModule,
      FormsModule,
    
      // ComponentsModule
    ),
    CookieService,
  ]
};
