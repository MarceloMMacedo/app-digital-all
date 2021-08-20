import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListContratosRoutingModule } from './list-contratos-routing.module';
import { ListContratosComponent } from './list-contratos.component';
import { CurrencyMaskInputMode } from 'ngx-currency';

import { NgxCurrencyModule } from "ngx-currency";

const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};


  const customMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: 0,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};
@NgModule({
  declarations: [
    ListContratosComponent
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule ,
    NgZorroAntdModule,
    ListContratosRoutingModule
  ]
})
export class ListContratosModule { }
