import { EditGrupoContratoComponent } from './edit-grupo-contrato.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path:'',
    component:EditGrupoContratoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGrupoContratoRoutingModule { }
