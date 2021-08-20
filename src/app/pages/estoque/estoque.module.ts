import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { ListProdutosComponent } from './list-produtos/list-produtos.component';


@NgModule({
  declarations: [
    ListProdutosComponent
  ],
  imports: [
    CommonModule,
    EstoqueRoutingModule
  ]
})
export class EstoqueModule { }
