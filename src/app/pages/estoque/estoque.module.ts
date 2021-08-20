import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { NbModulosModule } from './../../nb-modulos/nb-modulos.module';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { ListProdutosComponent } from './list-produtos/list-produtos.component';
import { CommonModule } from '@angular/common';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    ListProdutosComponent
  ],
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxCurrencyModule ,
  ],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EstoqueModule { }
