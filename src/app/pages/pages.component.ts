import { UtilsService } from './../../services/utils.service';
import { map } from 'rxjs/operators';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Observable } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[];
  hiddenfinanceiro: boolean = true;
  hiddenestoque: boolean = true;
  hiddenservico: boolean = true;

  time;
  constructor(
    private authService: NbAuthService,
    private utilservice: UtilsService) { }

  ngOnInit(): void {
    // this.loadMenu();
    let c = 0;
    this.time =
      setInterval(() => {
        try {
          this.getfinanceiro().subscribe(
            (rest) => {
              this.hiddenfinanceiro = !rest;
              this.loadMenu();
            }
          );

          this.getestoque().subscribe(
            (rest) => {
              this.hiddenestoque = !rest;
              this.loadMenu();
            }
          );

          this.getservico().subscribe(
            (rest) => {
              this.hiddenservico = !rest;
              this.loadMenu();
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

  loadMenu() {
    this.menu = [
      {
        title: 'Home',
        icon: 'home',
        link: '/',
      },
      /*{
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
      },*/
      {
        title: 'FINANCEIRO',
        group: true,
        hidden: this.hiddenfinanceiro

      },
      {
        title: 'Cadastros',
        icon: 'layout-outline',
        hidden: this.hiddenfinanceiro,
        children: [
          {
            title: 'Pessoas',
            icon: 'layout-outline',
            children: [
              {
                title: 'Empresa',
                link: 'empresa',
              },
              {
                title: 'Funcionários',
                link: 'funcionarios',
              },
              {
                title: 'Clientes',
                link: 'clientes',
              },
              {
                title: 'Fornecedores',
                link: 'fornecedores',
              },
            ]
          },
          {
            title: 'Financeiros',
            icon: 'layout-outline',
            children: [
              {
                title: 'Bancos/Caixas',
                link: 'bancos',
              },
              {
                title: 'Centro de Custos',
                link: '/centrocustos',
              },
              {
                title: 'Grupos',
                icon: 'layout-outline',
                children: [
                  {
                    title: 'Contratos',
                    link: 'anuncioscontratos',
                  },
                  {
                    title: 'Anúncios de Produtos ',
                    link: 'anunciosprodutos',
                  },
                  {
                    title: 'Cotas a Pagar',
                    link: 'grupocontaspagar',
                  },
                ]
              },
            ]
          },
          {
            title: 'Patrimônios',
            link: 'patrimonios',
          },
          {
            title: 'Contratos',
            link: 'contratos',
          },

          {
            title: 'Mão de Obra',
            link: 'maodeobra',
          },

        ]
      },
      {/* movimentalçao*/
        title: 'Movientação',
        icon: 'layout-outline',
        children: [
          {
            title: 'Contas Receber',
            link: 'contasreceber',
          },
          {
            title: 'Contas Pagar',
            link: 'contaspagar',
          },
        ]
      },
      {
        title: 'ESTOQUE',
        group: true,
        hidden: this.hiddenestoque
      },
      {
        title: 'Cadastros',
        icon: 'layout-outline',
        hidden: this.hiddenestoque,
        children: [
          {
            title: 'Produtos',
            link: 'estoque',
          },
          {
            title: 'Anuncios Loja',
            link: 'estoque/anuncios/anunciosloja',
          },
          {
            title: 'Anuncios web',
            link: 'estoque/anuncios/anuncioweb',
          }
        ],
      },
      {
        title: 'Ressupimento',
        icon: 'layout-outline',
        link: 'estoque/ressuprimento',
        hidden: this.hiddenestoque,
      },
      {
        title: 'Cotações',
        icon: 'layout-outline',
        link: 'estoque/cotacoes',
        hidden: this.hiddenestoque,
      },


    ];
  }

  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }
}
