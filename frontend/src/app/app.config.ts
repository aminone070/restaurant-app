import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { SeoService } from './core/services/seo.service';
import { StructuredDataService } from './core/services/structured-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone optimization: coalesce events to reduce change detection cycles
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),

    // Router with view transitions
    provideRouter(routes, 
      withViewTransitions()
    ),
    
    // HTTP client with fetch API (better performance than XMLHttpRequest)
    provideHttpClient(withFetch()),
    
    // Service Worker for PWA support (offline, caching, updates)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !environment.development,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
    // SEO and structured data services
    SeoService,
    StructuredDataService
  ]
};
