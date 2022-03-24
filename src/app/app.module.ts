import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './core/store/app.reducer';
import { NavStateService } from './core/services/nav-state.service';
import { EffectsModule } from '@ngrx/effects';
import { FavouriteEffects } from './features/favourite/store/favourite.effects';
import { LeagueEffects } from './features/leagues/store/leagues.effects';
import { AuthEffects } from './auth/store/auth.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationComponent } from './notifications/configuration/configuration.component';
import { NotificationModule } from './notifications/notification.module';
import { NotificationEffects } from './notifications/store/notification.effects';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [AppComponent, ConfigurationComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([FavouriteEffects, LeagueEffects, AuthEffects, NotificationEffects]),
    AppRoutingModule,
    NotificationModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register(`${environment.workerHref}/ngsw-worker.js`, {
      enabled: true,
    }),
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: true }),
    },
    NavStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
