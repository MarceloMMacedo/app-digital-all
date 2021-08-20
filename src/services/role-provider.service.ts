import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleProviderService {
  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          let x= token.isValid() ? token.getPayload()['role'] : 'guest' ;

          return x;
        }),
      );
  }
}
