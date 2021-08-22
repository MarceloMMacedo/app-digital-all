import { EditCotacaoComponent } from './edit-cotacao/edit-cotacao.component';
import { ListCotacaoComponent } from './../list-cotacao/list-cotacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ListCotacaoComponent
  }, {
    path:'/:id',
    component:EditCotacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotacaoRoutingModule { }
