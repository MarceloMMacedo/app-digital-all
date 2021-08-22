import { ReposicaoEstoqueComponent } from './reposicao-estoque/reposicao-estoque.component';
import { ListProdutosComponent } from './produto/list-produtos/list-produtos.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProdutosComponent } from './produto/edit-produtos/edit-produtos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-produtos',
    pathMatch: 'full',
  },
  {
    path: 'edit-produtos/:id',
    component: EditProdutosComponent
  },
  {
    path: 'list-produtos',
    component: ListProdutosComponent
  }
/*anuncios*/
,
  {
    path: 'anuncios',
    loadChildren: () => import('./anuncio/anuncio.module')
    .then(m => m.AnuncioModule),
  }
/*reposi*/
,
  {
    path: 'ressuprimento',
    loadChildren: () => import('./reposicao-estoque/reposicao-estoque.module')
    .then(m => m.ReposicaoEstoqueModule),
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
