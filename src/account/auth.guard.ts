import { JwtHelperService } from '@auth0/angular-jwt';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private router: Router, private authService: NbAuthService,
    private storage: StorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      let date: Date = new Date()
      let tok = this.storage.getLocalUser().value.substring(7);
      let dates = this.jwtHelper.getTokenExpirationDate(tok);
      console.log('token:' +tok);//+localUser.value.substring(7));


      let usercom;
      this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {

          if (token.isValid()) {

            const d1 = new Date(token.getPayload() * 1000);
            //usercom = ; // here we receive a payload from the token and assigns it to our `user` variable
            if (d1 <= date) {
              this.storage.setLocalUser(null);
             // console.log(1);

              this.router.navigate([''])
                .then(() => {
                  window.location.reload();
                });
            } else {};




          }

        });
      let localUser = this.storage.getLocalUser();
      console.log(localUser);

      const token = localUser.value;
      if (token != null) {
        //console.log(token);
        return true;
      } else {
        this.router.navigate(['/']);
        console.log('aut1');
        return false;
      }
    } catch (error) {
      if (
        this.storage.getLocalUser() != null) {
        console.log('aut2');
        this.router.navigate(['login']);
        return false;
      } else {
        console.log('aut3');
        this.router.navigate(['login']);
        return false;
      }

    }
  }
}
