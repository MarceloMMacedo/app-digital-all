import { ThemeModule } from './../layout/theme.module';
import { NbModulosModule } from './../nb-modulos/nb-modulos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    NbModulosModule,
    ThemeModule.forRoot(),
    PagesRoutingModule
  ]
})
export class PagesModule { }
