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



const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};
@NgModule({
  declarations: [
    EditCotacaoComponent,
    ListCotacaoComponent
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

    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CotacaoModule { }
