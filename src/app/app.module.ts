import { ErrorInterceptor } from './../account/error-interceptor.service';
import { API_CONFIG } from './../config/api.config';
import { AuthInterceptor } from './../account/auth-interceptor.service';
import { StorageService } from './../services/storage.service';
import { RoleProviderService } from './../services/role-provider.service';
import { AuthGuard } from './../account/auth.guard';
import { ThemeModule } from './layout/theme.module';
import { NbModulosModule } from './nb-modulos/nb-modulos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { NgZorroAntdModule } from './nb-modulos/ng-zorro-antd.module';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbModulosModule,
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    FormsModule,
    NgZorroAntdModule,
    HttpClientModule,
   /* NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['view', 'comments'],
        },
        ROLE_OPF: {
          view: 'opf',
          create: 'news',
          remove: '*',
        },
        user: {
          parent: 'ROLE_OPF',
          create: 'news',
        },
        ROLE_EST:{
          view:  ['view','adme']
        },
        ROLE_ADMG: {

          view:  'admg' ,
          create: 'news',
          remove: '*',
        },
      },
    }),*/
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: API_CONFIG.baseUrl,

          requestPass:{
          endpoint: "/restpasswordfuncionario",
          method: "post",
          redirect: {

          }
        },


          login: {
            endpoint: '/login',
            method: 'post',
            redirect: {
              success: '/',
            }
          },

          token: {
            class: NbAuthJWTToken,
            key: 'token',
            getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) =>
              res.headers.get('Authorization'),

          },
          logout: {
            method: 'delete',
            redirect: {
              success: '/',
              failure:'/'

            }
          },

        }),
      ],
      forms: {
        login: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: false,
             // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
        requestPass: {
          redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.

             // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
        },
      },
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    { provide: NbRoleProvider, useClass: RoleProviderService },

    StorageService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
