import { ReposicaoEstoqueComponent } from './reposicao-estoque.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ReposicaoEstoqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReposicaoEstoqueRoutingModule { }
