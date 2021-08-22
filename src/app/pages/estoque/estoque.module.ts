
import { ReposicaoEstoqueComponent } from './reposicao-estoque/reposicao-estoque.component';

import { AvatarProdutosComponent } from './produto/avatar-produtos/avatar-produtos.component';
import { EditProdutosComponent } from './produto/edit-produtos/edit-produtos.component';
import { ListProdutosComponent } from './produto/list-produtos/list-produtos.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { NbModulosModule } from './../../nb-modulos/nb-modulos.module';
import { NgZorroAntdModule } from 'src/app/nb-modulos/ng-zorro-antd.module';
import { ChartsModule } from 'ng2-charts';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { CommonModule } from '@angular/common';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DescricaoProdutoComponent } from './produto/descricao-produto/descricao-produto.component';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    ListProdutosComponent,
    EditProdutosComponent,
    DescricaoProdutoComponent,
    AvatarProdutosComponent,
  ],
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    NgbPaginationModule,
    ChartsModule,
    NgZorroAntdModule,
    NbModulosModule,
    NgxPrintModule,
    NgxMaskModule.forRoot(maskConfig),

    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EstoqueModule { }
