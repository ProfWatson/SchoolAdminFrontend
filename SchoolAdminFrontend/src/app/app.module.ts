import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppConfigService } from './core/services/app-config.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/http-interceptors/auth.interceptor';
import { LoginModule } from './pages/login/login.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './shared/components/notification/notification.component';

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    NotificationComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
