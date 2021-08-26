import { ListaMaoObraComponent } from './lista-mao-obra/lista-mao-obra.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
   component:ListaMaoObraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaoobraRoutingModule { }
