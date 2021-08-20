import { EditGrupoAnuncioComponent } from './edit-grupo-anuncio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:EditGrupoAnuncioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGrupoAnuncioRoutingModule { }
