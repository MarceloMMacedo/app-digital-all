import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { EditCentroCustoRoutingModule } from './edit-centro-custo-routing.module';
import { EditCentroCustoComponent } from './edit-centro-custo.component';


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
    EditCentroCustoComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbPaginationModule,
    NgZorroAntdModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    EditCentroCustoRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditCentroCustoModule { }
