import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { BASE_API_URL, GMAPS_API_KEY } from './providerToken';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideIonicAngular(),
    {
      provide: GMAPS_API_KEY, useValue: environment.googleMapsApiKey
    },
    {
      provide: BASE_API_URL, useValue: environment.baseApiUrl
    }
  ],
});
