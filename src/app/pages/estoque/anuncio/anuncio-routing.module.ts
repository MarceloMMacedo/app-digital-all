import { EditAnuncioLojaComponent } from './loja/edit-anuncio-loja/edit-anuncio-loja.component';
import { ListAnuncioLojaComponent } from './loja/list-anuncio-loja/list-anuncio-loja.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'anunciosloja',
    component:ListAnuncioLojaComponent
  },
  {
    path:'anunciosloja/:id',
    component:EditAnuncioLojaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnuncioRoutingModule { }
