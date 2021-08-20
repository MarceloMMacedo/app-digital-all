import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { ReportContasReceberComponent } from './report-contas-receber.component';
import { NbModulosModule } from './../../../nb-modulos/nb-modulos.module';
 import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { ContasReceberRoutingModule } from './contas-receber-routing.module';
import { ListAllForClientComponent } from './list-all-for-client/list-all-for-client.component';
import { ListContratosComponent } from './componentes/list-contratos/list-contratos.component';
import { ReciboContratoComponent } from './componentes/recibo-contrato/recibo-contrato.component';
import { LeituraProducaoComponent } from './componentes/leitura-producao/leitura-producao.component';
import { QuitarFaturaContratoComponent } from './componentes/quitar-fatura-contrato/quitar-fatura-contrato.component';
import { ListAllForDateComponent } from './list-all-for-date/list-all-for-date.component';
import { RecidoOutrosComponent } from './componentes/recido-outros/recido-outros.component';
import { QuitarFaturaEntradaComponent } from './componentes/quitar-fatura-entrada/quitar-fatura-entrada.component';


@NgModule({
  declarations: [
    ReportContasReceberComponent,
    ListAllForClientComponent,
    ListContratosComponent,
    ReciboContratoComponent,
    LeituraProducaoComponent,
    QuitarFaturaContratoComponent,
    ListAllForDateComponent,
    RecidoOutrosComponent,
    QuitarFaturaEntradaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxCurrencyModule ,
    ContasReceberRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContasReceberModule { }
