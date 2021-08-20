import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { ListFornecedoresRoutingModule } from './list-fornecedores-routing.module';
import { ListFornecedoresComponent } from './list-fornecedores.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ListFornecedoresComponent
  ],
  imports: [
    CommonModule,

    NgbModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbPaginationModule,
    NgZorroAntdModule,
    ListFornecedoresRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListFornecedoresModule { }
