import { NbModulosModule } from './../../nb-modulos/nb-modulos.module';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { IConfig } from 'ngx-mask';
import { EditGeneric } from './edit-generic';
import { ListGenericClass } from './list-generic-class';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    NgZorroAntdModule,
    NbModulosModule,
    NgbModule,
    CommonModule,
  ],
  declarations: [ListGenericClass,EditGeneric]
})
export class GenericClassModule { }
