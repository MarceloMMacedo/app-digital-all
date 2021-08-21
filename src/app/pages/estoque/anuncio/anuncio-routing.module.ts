import { EditAnuncioWebComponent } from './web/edit-anuncio-web/edit-anuncio-web.component';
import { EditAnuncioLojaComponent } from './loja/edit-anuncio-loja/edit-anuncio-loja.component';
import { ListAnuncioLojaComponent } from './loja/list-anuncio-loja/list-anuncio-loja.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnuncioWebComponent } from './web/list-anuncio-web/list-anuncio-web.component';

const routes: Routes = [
  {
    path:'anunciosloja',
    component:ListAnuncioLojaComponent
  },
  {
    path:'anunciosloja/:id',
    component:EditAnuncioLojaComponent
  },
   {
    path:'anuncioweb',
    component:ListAnuncioWebComponent
  },
  {
    path:'anuncioweb/:id',
    component:EditAnuncioWebComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnuncioRoutingModule { }
