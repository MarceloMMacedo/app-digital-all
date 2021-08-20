import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ListGrupoAnuncioComponent } from './list-grupo-anuncio.component';


import { ListGrupoAnuncioRoutingModule } from './list-grupo-anuncio-routing.module';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';




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
  declarations: [ListGrupoAnuncioComponent],
  imports: [

    CommonModule,
    NgbPaginationModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgZorroAntdModule,
    ListGrupoAnuncioRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListGrupoAnuncioModule { }
