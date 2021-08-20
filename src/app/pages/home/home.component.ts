import { UtilsService } from './../../../services/utils.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';


import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hiddenfinanceiro: boolean = true;
  hiddenestoque: boolean = true;
  hiddenservico: boolean = true;

  time;
  constructor(
    private authService: NbAuthService,
    private utilservice: UtilsService) { }

  ngOnInit(): void {
let c=0;
    this.time =
      setInterval(() => {
        try {
          this.getfinanceiro().subscribe(
            (rest) => {
              this.hiddenfinanceiro = !rest;

            }
          );

          this.getestoque().subscribe(
            (rest) => {
              this.hiddenestoque = !rest;

            }
          );

          this.getservico().subscribe(
            (rest) => {
              this.hiddenservico = !rest;
            }
          );
        } catch (error) {
        };

       c++;
        if (c === 10) {
          clearInterval(this.time);
        }
      }, 500);

  }
  getfinanceiro(): Observable<boolean> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          console.log(token.getPayload()['financeiro']);

            return this.utilservice.convertToBoolean(token.getPayload()['financeiro']);
        }),
      );
  }

  getestoque(): Observable<boolean> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return this.utilservice.convertToBoolean(token.getPayload()['estoque']);
        }),
      );
  }

  getservico(): Observable<boolean> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return this.utilservice.convertToBoolean(token.getPayload()['servico']);
        }),
      );
  }

  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }
}

