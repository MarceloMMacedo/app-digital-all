import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCentroCustoComponent } from './list-centro-custo.component';

const routes: Routes = [
  {
    path:'',
    component:ListCentroCustoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCentroCustoRoutingModule { }
