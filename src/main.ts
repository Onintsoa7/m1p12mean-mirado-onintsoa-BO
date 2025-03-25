import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Use this instead of Noop
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

registerLocaleData(fr);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    importProvidersFrom(
      HttpClientModule,
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts')
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      FormsModule
    ),
    provideNzI18n(fr_FR),
    provideHttpClient()
  ]
});
