import { ListContasPagarFaturasComponent } from './list-contas-pagar-faturas/list-contas-pagar-faturas.component';
import { ListContasPagarGrupoComponent } from './list-contas-pagar-grupo/list-contas-pagar-grupo.component';
import { ReportContasPagarHistoricoComponent } from './report-contas-pagar-historico/report-contas-pagar-historico.component';

 import { ItemsListContaspagarComponent } from './componentes/items-list-contaspagar/items-list-contaspagar.component';
import { AddContaspagarComponent } from './componentes/add-contaspagar/add-contaspagar.component';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { QuitarContasPagarComponent } from './quitar-contas-pagar/quitar-contas-pagar.component';
import { ContasPagarComponent } from './contas-pagar.component';
import { NbModulosModule } from './../../../nb-modulos/nb-modulos.module';
 import { ChartsModule } from 'ng2-charts';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContasPagarRoutingModule } from './contas-pagar-routing.module';
import { ListContasPagarComponent } from './list-contas-pagar/list-contas-pagar.component';


import {NgxPrintModule} from 'ngx-print';
import { PreContasPagarCotacaoComponent } from './pre-contas-pagar-cotacao/pre-contas-pagar-cotacao.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ContasPagarComponent,
    QuitarContasPagarComponent,
    AddContaspagarComponent,
    ItemsListContaspagarComponent,
    ListContasPagarComponent,
    ReportContasPagarHistoricoComponent,
    ListContasPagarGrupoComponent,ListContasPagarFaturasComponent, PreContasPagarCotacaoComponent
  ],
  imports: [
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    CommonModule,NgxCurrencyModule ,
    NgxMaskModule.forRoot(maskConfig),
    NgxPrintModule,
    ContasPagarRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContasPagarModule { }
