import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ComponenteDataGralComponent } from './componente-data-gral/componente-data-gral.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    EmpresaComponent,
    ComponenteDataGralComponent,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxMaskModule.forRoot(maskConfig),
    EmpresaRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmpresaModule { }
