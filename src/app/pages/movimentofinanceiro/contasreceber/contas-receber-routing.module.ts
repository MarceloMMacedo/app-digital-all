import { ListAllForDateComponent } from './list-all-for-date/list-all-for-date.component';
import { ListAllForClientComponent } from './list-all-for-client/list-all-for-client.component';
import { ReportContasReceberComponent } from './report-contas-receber.component';
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:ReportContasReceberComponent
  },
  {
    path:'contas-receber-periodo',
    component:ListAllForDateComponent
  },
  {
    path:'contas-receber-cliente',
    component:ListAllForClientComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasReceberRoutingModule { }
