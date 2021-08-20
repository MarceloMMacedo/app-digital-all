import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';

import { ListClientesRoutingModule } from './list-clientes-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ListClientesComponent } from './list-clientes.component';

import { NgbAlertModule, NgbModalModule, NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    ListClientesComponent
  ],
  imports: [
    NgZorroAntdModule,
    NgxMaskModule.forRoot(maskConfig),
    CommonModule, FormsModule,
    NgbPaginationModule,
    NgbModule,
    ListClientesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListClientesModule { }
