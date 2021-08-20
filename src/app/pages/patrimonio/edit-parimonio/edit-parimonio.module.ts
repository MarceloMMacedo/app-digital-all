import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { MedidoresPatrimonioComponent } from './../medidores-patrimonio/medidores-patrimonio.component';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { IConfig } from 'ngx-mask';
import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
import { PatrimonioDataPatrimonioComponent } from './../patrimonio-data-patrimonio/patrimonio-data-patrimonio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditParimonioRoutingModule } from './edit-parimonio-routing.module';
import { EditParimonioComponent } from './edit-parimonio.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RemocaoPatrimonioComponent } from '../remocao-patrimonio/remocao-patrimonio.component';

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
    EditParimonioComponent,
    PatrimonioDataPatrimonioComponent,
    MedidoresPatrimonioComponent,
    RemocaoPatrimonioComponent,
  ],
  imports: [
    CommonModule,
   NgZorroAntdModule,
    NzMessageServiceModule,
    NzModalModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    EditParimonioRoutingModule
  ]
})
export class EditParimonioModule { }
