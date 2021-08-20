import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { EditFornecedoresComponent } from './edit-fornecedores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFornecedoresRoutingModule } from './edit-fornecedores-routing.module';
import { EnderecoPessoaComponent } from './endereco-pessoa/endereco-pessoa.component';
import { ContatoPessoaComponent } from './contato-pessoa/contato-pessoa.component';
import { DadosGeralComponent } from './dados-geral/dados-geral.component';

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
    EditFornecedoresComponent,
    EnderecoPessoaComponent,
    ContatoPessoaComponent,
    DadosGeralComponent
  ],
  imports: [
    CommonModule,
      NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
      NgbModule,
      NgxMaskModule.forRoot(maskConfig),
      NgbPaginationModule,
      NgZorroAntdModule,
    EditFornecedoresRoutingModule
  ]
})
export class EditFornecedoresModule { }
