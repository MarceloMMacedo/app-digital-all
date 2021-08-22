import { NgxPrintModule } from 'ngx-print';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { PrintContratoComponent } from './../componentes/print-contrato/print-contrato.component';
import { FaturasContratoComponent } from './../componentes/faturas-contrato/faturas-contrato.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EnderecoPessoaComponent } from './../componentes/endereco-pessoa/endereco-pessoa.component';
import { ContatoPessoaComponent } from './../componentes/contato-pessoa/contato-pessoa.component';
import { EquipamentoContratoComponent } from './../componentes/equipamento-contrato/equipamento-contrato.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditContratoRoutingModule } from './edit-contrato-routing.module';
import { EditContratoComponent } from './edit-contrato.component';
import { PecasConsumiveisComponent } from '../componentes/pecas-consumiveis/pecas-consumiveis.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    EditContratoComponent,
    EquipamentoContratoComponent,
    ContatoPessoaComponent,
    EnderecoPessoaComponent,
    PecasConsumiveisComponent,
    FaturasContratoComponent,
    PrintContratoComponent
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule ,
    NgZorroAntdModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxPrintModule,
    EditContratoRoutingModule
  ]
})
export class EditContratoModule { }
