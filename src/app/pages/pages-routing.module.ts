
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'empresa',
        loadChildren: () => import('./pessoas/empresa/empresa.module').then(m => m.EmpresaModule),
      },
      {
        path: 'clientes',
        loadChildren: () => import('./pessoas/cliente/list-clientes/list-clientes.module').then(m => m.ListClientesModule),
      },
      {
        path: 'clientes/:id',
        loadChildren: () => import('./pessoas/cliente/edit-cliente/edit-clientes.module').then(m => m.EditClientesModule),
      },
      {
        path: 'funcionarios',
        loadChildren: () => import('./pessoas/funcionario/list-funcionarios/list-funcionarios.module')
          .then(m => m.ListFuncionariosModule),
      },
      {
        path: 'funcionarios/:id',
        loadChildren: () => import('./pessoas/funcionario/edit-funcionario/edit-funcionario.module')
          .then(m => m.EditFuncionarioModule),
      },
      {
        path: 'fornecedores',
        loadChildren: () => import('./pessoas/fornecedor/list-fornecedores/list-fornecedores.module')
          .then(m => m.ListFornecedoresModule),
      },
      {
        path: 'fornecedores/:id',
        loadChildren: () => import('./pessoas/fornecedor/edit-fornecedores/edit-fornecedores.module')
          .then(m => m.EditFornecedoresModule),
      },
      {
        path: 'bancos',
        loadChildren: () => import('./financeiro/banco/list-banco/list-banco.module')
          .then(m => m.ListBancoModule),
      },
      {
        path: 'bancos/:id',
        loadChildren: () => import('./financeiro/banco/edit-banco/edit-banco.module')
          .then(m => m.EditBancoModule),
      },
      {
        path: 'centrocustos',
        loadChildren: () => import('./financeiro/centrocusto/list-centro-custo/list-centro-custo.module')
          .then(m => m.ListCentroCustoModule),
      },
      {
        path: 'centrocustos/:id',
        loadChildren: () => import('./financeiro/centrocusto/edit-centro-custo/edit-centro-custo.module')
          .then(m => m.EditCentroCustoModule),
      },
      /***grups finaceiro anuncioscontratos */
      {
        path: 'anuncioscontratos',
        loadChildren: () => import('./grupofinanceiro/grupocontrato/list-grupo-contrato/list-grupo-contrato.module')
          .then(m => m.ListGrupoContratoModule),
      },
      {
        path: 'anuncioscontratos/:id',
        loadChildren: () => import('./grupofinanceiro/grupocontrato/edit-grupo-contrato/edit-grupo-contrato.module')
          .then(m => m.EditGrupoContratoModule),
      },
      {
        path: 'anunciosprodutos',
        loadChildren: () => import('./grupofinanceiro/grupoanuncio/list-grupo-anuncio/list-grupo-anuncio.module')
          .then(m => m.ListGrupoAnuncioModule),
      },
      {
        path: 'anunciosprodutos/:id',
        loadChildren: () => import('./grupofinanceiro/grupoanuncio/edit-grupo-anuncio/edit-grupo-anuncio.module')
          .then(m => m.EditGrupoAnuncioModule),
      },
      {
        path: 'grupocontaspagar',
        loadChildren: () => import('./grupofinanceiro/grupocontapagar/list-contaspagar/list-contaspagar.module')
          .then(m => m.ListContaspagarModule),
      },
      {
        path: 'grupocontaspagar/:id',
        loadChildren: () => import('./grupofinanceiro/grupocontapagar/edit-contaspagar/edit-contaspagar.module')
          .then(m => m.EditContaspagarModule),
      }
      /*patrimonio */
      ,
      {
        path: 'patrimonios',
        loadChildren: () => import('./patrimonio/list-parimonio/list-parimonio.module')
          .then(m => m.ListParimonioModule),
      },
      {
        path: 'patrimonios/:id',
        loadChildren: () => import('./patrimonio/edit-parimonio/edit-parimonio.module')
          .then(m => m.EditParimonioModule),
      },

      /*contratos */
      {
        path: 'contratos',
        loadChildren: () => import('./contrato/list-contratos/list-contratos.module')
          .then(m => m.ListContratosModule),
      },
      {
        path: 'contratos/:id',
        loadChildren: () => import('./contrato/edit-contrato/edit-contrato.module')
          .then(m => m.EditContratoModule),
      },
      /**contas receber e pagar */
      {
        path: 'contasreceber',
        loadChildren: () => import('./movimentofinanceiro/contasreceber/contas-receber.module')
          .then(m => m.ContasReceberModule),
      }, {
        path: 'contaspagar',
        loadChildren: () => import('./movimentofinanceiro/contaspagar/contas-pagar.module')
          .then(m => m.ContasPagarModule),
      }
      /*produtos/*/
      , {
        path: 'produtos',
        loadChildren: () => import('./estoque/estoque.module')
          .then(m => m.EstoqueModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
