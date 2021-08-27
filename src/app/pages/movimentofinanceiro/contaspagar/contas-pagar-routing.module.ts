import { ListContasPagarFaturasComponent } from './list-contas-pagar-faturas/list-contas-pagar-faturas.component';
import { ListContasPagarGrupoComponent } from './list-contas-pagar-grupo/list-contas-pagar-grupo.component';
import { ListContasPagarComponent } from './list-contas-pagar/list-contas-pagar.component';
import { ContasPagarComponent } from './contas-pagar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuitarContasPagarComponent } from './quitar-contas-pagar/quitar-contas-pagar.component';
import { PreContasPagarCotacaoComponent } from './pre-contas-pagar-cotacao/pre-contas-pagar-cotacao.component';

const routes: Routes = [  {
  path:'',
  component:ContasPagarComponent
},
{
  path:'contas-pagar-historico',
  component:ListContasPagarComponent
},
{
  path:'quitar-fatura/:return/:id',
  component:QuitarContasPagarComponent
},
{
  path:'contas-pagar-grupo',
  component:ListContasPagarGrupoComponent
},


{
  path:'contas-pagar-faturas',
  component:ListContasPagarFaturasComponent
},
{
  path:'precontaspagar',
  component:PreContasPagarCotacaoComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasPagarRoutingModule { }
