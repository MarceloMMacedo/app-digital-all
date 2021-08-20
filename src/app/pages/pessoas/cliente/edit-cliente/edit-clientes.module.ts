
import { EnderecoPessoaComponent } from './../../componente/endereco-pessoa/endereco-pessoa.component';
import { ContatosPessoaComponent } from './../../componente/contatos-pessoa/contatos-pessoa.component';
import { DadosGeralComponent } from './../../componente/dados-geral/dados-geral.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContatoPessoaComponent } from './../../componente/contato-pessoa/contato-pessoa.component';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { EditClienteRoutingModule } from './edit-cliente-routing.module';
import { EditClienteComponent } from './edit-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule, IConfig } from 'ngx-mask'


import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    EditClienteComponent,
    ContatoPessoaComponent,
    DadosGeralComponent,
    ContatoPessoaComponent,
    ContatosPessoaComponent,
    EnderecoPessoaComponent,
  ],
  imports: [
    NgZorroAntdModule,
    NgxMaskModule.forRoot(maskConfig),
    CommonModule, FormsModule,

    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModule,
    EditClienteRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditClientesModule { }
