import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { pointsReducer } from './store/points/points.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configuration des routes
    provideHttpClient(), // Pour utiliser HttpClient
    provideStore({ points: pointsReducer }), // NgRx Store
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }) // Outils de dev pour NgRx
  ]
};
