import { ListaRessuprimentoComponent } from './lista-ressuprimento/lista-ressuprimento.component';
import { ReposicaoEstoqueComponent } from './reposicao-estoque.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPrintModule } from 'ngx-print';
import { NbModulosModule } from './../../../nb-modulos/nb-modulos.module';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReposicaoEstoqueRoutingModule } from './reposicao-estoque-routing.module';
import { PirntRessuprimentoComponent } from './pirnt-ressuprimento/pirnt-ressuprimento.component';


@NgModule({
  declarations: [
    ReposicaoEstoqueComponent,
    ListaRessuprimentoComponent,
    PirntRessuprimentoComponent
  ],
  imports: [
    CommonModule,
    ReposicaoEstoqueRoutingModule,
    NgbPaginationModule,
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxMaskModule ,

    NgxCurrencyModule,
  ],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReposicaoEstoqueModule { }
