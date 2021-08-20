import { AnuncioRoutingModule } from './anuncio-routing.module';
import { NbModulosModule } from './../../../nb-modulos/nb-modulos.module';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';

import { CommonModule } from '@angular/common';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DescricaoProdutoComponent } from './descricao-produto/descricao-produto.component';
import { ListAnuncioLojaComponent } from './loja/list-anuncio-loja/list-anuncio-loja.component';
import { EditAnuncioLojaComponent } from './loja/edit-anuncio-loja/edit-anuncio-loja.component';

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

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    DescricaoProdutoComponent,
    ListAnuncioLojaComponent,
    EditAnuncioLojaComponent
  ],
  imports: [
    CommonModule,
    AnuncioRoutingModule,
    NgbPaginationModule,
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxMaskModule.forRoot(maskConfig),

    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnuncioModule { }
