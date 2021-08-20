import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: NbAuthService,
    private router: Router,
    public storage: StorageService,
    private nbTokenService: NbTokenService,
    public accountService: AccountService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //////console.log(req);

    /* this.nbTokenService.get()
       .subscribe((key) => {


           token = key.getPayload; // here we receive a payload from the token and assigns it to our `user` variable

           //console.log(token);


       });
 */
    let localUser = this.storage.getLocalUser();
    ////console.log(localUser);

    //console.log(req);

    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', localUser.value) });
      return next.handle(authReq);
    }
    else {
     //console.log(req);
      return next.handle(req);
    }

  }
}
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};



