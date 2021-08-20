

import { ListFuncionariosRoutingModule } from './list-funcionarios-routing.module';
import { ListFuncionariosComponent } from './list-funcionarios.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';


const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    ListFuncionariosComponent
  ],
  imports: [
    CommonModule,
    ListFuncionariosRoutingModule,

    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbPaginationModule,
    NgZorroAntdModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListFuncionariosModule { }
