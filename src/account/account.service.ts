import { UsuarioWeb } from './../models/usuario-web';
import { API_CONFIG } from './../config/api.config';

import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalUser } from '../models/local_user';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    private router: Router,) {
  }
  login(creds: { email: string, senha: string }): boolean {
    this.storage.setLocalUser(null);

    this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }).toPromise()
      .then(
        rest => {
          this.successfulLogin(rest.headers.get('Authorization'));
          this.successfulLogin(rest.headers.get('Authorization'));
          this.setUserLocalStore();

          return true;
        }
      );
    return false;
  }
  authenticate(creds: { login: string, senha: string }) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }
  setUserLocalStore(): void {
    this.http.get<UsuarioWeb>(`${API_CONFIG.baseUrl}/usuarioweb`)
      .toPromise()
      .then(
        rest => {
          console.log(rest);

          this.storage.setUsuarioWeb(rest);
          this.router.navigate([''])
          .then(() => {
            window.location.reload();
          });;
        }
      )
  }
  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);

    let user: LocalUser = {
      value: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);

  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
  }

}
