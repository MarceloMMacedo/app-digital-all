
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditFuncionarioComponent } from './edit-funcionario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFuncionarioRoutingModule } from './edit-funcionario-routing.module';
import { EnderecoPessoaComponent } from './endereco-pessoa/endereco-pessoa.component';
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
  inputMode: CurrencyMaskInputMode.FINANCIAL}

@NgModule({
    declarations: [
      EditFuncionarioComponent,
      EnderecoPessoaComponent
    ],
    imports: [
      CommonModule,
      NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
      NgbModule,
      NgxMaskModule.forRoot(maskConfig),
      NgZorroAntdModule,
      EditFuncionarioRoutingModule
    ]
  })
export class EditFuncionarioModule { }
