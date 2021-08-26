import { ListaMaoObraComponent } from './lista-mao-obra/lista-mao-obra.component';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaoobraRoutingModule } from './maoobra-routing.module';


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
    ListaMaoObraComponent],
  imports: [
    CommonModule,
    MaoobraRoutingModule,
    NgbPaginationModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgZorroAntdModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaoobraModule { }
