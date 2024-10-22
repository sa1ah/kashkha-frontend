import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { prependListener } from 'process';
// import { loadScreenInterceptor } from './interceptor/load-screen.interceptor';
import { httpReqInterceptor } from './interceptor/http-req.interceptor';
import { loadScreenInterceptor } from './interceptor/load-screen.interceptor';
// import { ImageViewerModule } from 'ngx-image-viewer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules), withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([ loadScreenInterceptor, httpReqInterceptor])),
    provideNoopAnimations(),
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule])
  ],
};
