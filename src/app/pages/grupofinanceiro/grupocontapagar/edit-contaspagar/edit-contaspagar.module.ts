import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { EditHintoricocontaspagarComponent } from './../edit-hintoricocontaspagar/edit-hintoricocontaspagar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { EditContaspagarRoutingModule } from './edit-contaspagar-routing.module';
import { EditContaspagarComponent } from './edit-contaspagar.component';


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
    EditContaspagarComponent,
    EditHintoricocontaspagarComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgZorroAntdModule,
    EditContaspagarRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditContaspagarModule { }
