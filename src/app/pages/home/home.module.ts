
import {  NgZorroAntdModule } from './../../nb-modulos/ng-zorro-antd.module';
import { NbModulosModule } from './../../nb-modulos/nb-modulos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ThemeModule } from 'src/app/layout/theme.module';
import { ResumofinanceiroComponent } from './resumofinanceiro/resumofinanceiro.component';


@NgModule({
  declarations: [
    HomeComponent,
    ResumofinanceiroComponent
  ],
  imports: [
    CommonModule,
    NbModulosModule,
    ThemeModule,
     NgZorroAntdModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
