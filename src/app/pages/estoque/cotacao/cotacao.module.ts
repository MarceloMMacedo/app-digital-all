import { NbModulosModule } from './../../../nb-modulos/nb-modulos.module';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotacaoRoutingModule } from './cotacao-routing.module';
import { EditCotacaoComponent } from './edit-cotacao/edit-cotacao.component';
import { ListCotacaoComponent } from './list-cotacao/list-cotacao.component';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';
import { EstoqueRoutingModule } from '../estoque-routing.module';
import { ListItensCotacaoComponent } from './list-itens-cotacao/list-itens-cotacao.component';
import { ReportCotacaoComponent } from './report-cotacao/report-cotacao.component';



const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    EditCotacaoComponent,
    ListCotacaoComponent,
    ListItensCotacaoComponent,
    ReportCotacaoComponent
  ],
  imports: [
    CommonModule,
    CotacaoRoutingModule,
    EstoqueRoutingModule,
    NgbPaginationModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxMaskModule.forRoot(maskConfig),

    NgxCurrencyModule ,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CotacaoModule { }
