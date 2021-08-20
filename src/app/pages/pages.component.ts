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
   let c=0;
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
                  } ,
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
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Layout',
        icon: 'layout-outline',
        children: [
          {
            title: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            title: 'List',
            link: '/pages/layout/list',
          },
          {
            title: 'Infinite List',
            link: '/pages/layout/infinite-list',
          },
          {
            title: 'Accordion',
            link: '/pages/layout/accordion',
          },
          {
            title: 'Tabs',
            pathMatch: 'prefix',
            link: '/pages/layout/tabs',
          },
        ],
      },
      {
        title: 'Forms',
        icon: 'edit-2-outline',
        children: [
          {
            title: 'Form Inputs',
            link: '/pages/forms/inputs',
          },
          {
            title: 'Form Layouts',
            link: '/pages/forms/layouts',
          },
          {
            title: 'Buttons',
            link: '/pages/forms/buttons',
          },
          {
            title: 'Datepicker',
            link: '/pages/forms/datepicker',
          },
        ],
      },
      {
        title: 'UI Features',
        icon: 'keypad-outline',
        link: '/pages/ui-features',
        children: [
          {
            title: 'Grid',
            link: '/pages/ui-features/grid',
          },
          {
            title: 'Icons',
            link: '/pages/ui-features/icons',
          },
          {
            title: 'Typography',
            link: '/pages/ui-features/typography',
          },
          {
            title: 'Animated Searches',
            link: '/pages/ui-features/search-fields',
          },
        ],
      },
      {
        title: 'Modal & Overlays',
        icon: 'browser-outline',
        children: [
          {
            title: 'Dialog',
            link: '/pages/modal-overlays/dialog',
          },
          {
            title: 'Window',
            link: '/pages/modal-overlays/window',
          },
          {
            title: 'Popover',
            link: '/pages/modal-overlays/popover',
          },
          {
            title: 'Toastr',
            link: '/pages/modal-overlays/toastr',
          },
          {
            title: 'Tooltip',
            link: '/pages/modal-overlays/tooltip',
          },
        ],
      },
      {
        title: 'Extra Components',
        icon: 'message-circle-outline',
        children: [
          {
            title: 'Calendar',
            link: '/pages/extra-components/calendar',
          },
          {
            title: 'Progress Bar',
            link: '/pages/extra-components/progress-bar',
          },
          {
            title: 'Spinner',
            link: '/pages/extra-components/spinner',
          },
          {
            title: 'Alert',
            link: '/pages/extra-components/alert',
          },
          {
            title: 'Calendar Kit',
            link: '/pages/extra-components/calendar-kit',
          },
          {
            title: 'Chat',
            link: '/pages/extra-components/chat',
          },
        ],
      },
      {
        title: 'Maps',
        icon: 'map-outline',
        children: [
          {
            title: 'Google Maps',
            link: '/pages/maps/gmaps',
          },
          {
            title: 'Leaflet Maps',
            link: '/pages/maps/leaflet',
          },
          {
            title: 'Bubble Maps',
            link: '/pages/maps/bubble',
          },
          {
            title: 'Search Maps',
            link: '/pages/maps/searchmap',
          },
        ],
      },
      {
        title: 'Charts',
        icon: 'pie-chart-outline',
        children: [
          {
            title: 'Echarts',
            link: '/pages/charts/echarts',
          },
          {
            title: 'Charts.js',
            link: '/pages/charts/chartjs',
          },
          {
            title: 'D3',
            link: '/pages/charts/d3',
          },
        ],
      },
      {
        title: 'Editors',
        icon: 'text-outline',
        children: [
          {
            title: 'TinyMCE',
            link: '/pages/editors/tinymce',
          },
          {
            title: 'CKEditor',
            link: '/pages/editors/ckeditor',
          },
        ],
      },
      {
        title: 'Tables & Data',
        icon: 'grid-outline',
        children: [
          {
            title: 'Smart Table',
            link: '/pages/tables/smart-table',
          },
          {
            title: 'Tree Grid',
            link: '/pages/tables/tree-grid',
          },
        ],
      },
      {
        title: 'Miscellaneous',
        icon: 'shuffle-2-outline',
        children: [
          {
            title: '404',
            link: '/pages/miscellaneous/404',
          },
        ],
      },
      {
        title: 'Auth',
        icon: 'lock-outline',
        children: [
          {
            title: 'Login',
            link: '/auth/login',
          },
          {
            title: 'Register',
            link: '/auth/register',
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
          },
        ],
      },
    ];
  }

  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }
}
