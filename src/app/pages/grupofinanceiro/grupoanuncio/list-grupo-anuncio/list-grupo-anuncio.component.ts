import { ListGenericClass } from './../../../genericclasses/list-generic-class';
import { GrupoFinanceiroContrato } from './../../../../../models/grupo-financeiro-contrato';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-list-grupo-anuncio',
  templateUrl: './list-grupo-anuncio.component.html',
  styleUrls: ['./list-grupo-anuncio.component.css']
})
export class ListGrupoAnuncioComponent extends ListGenericClass implements OnInit {


  constructor(
    public modalService: NzModalService,
    public router: Router,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'grupofinanceiroanuncio', 'anunciosprodutos/');

  }
  ngOnInit(): void {
    super.ngOnInit();
   ;
  }
  showModal(): void {
    this.obj = { nome: ''  } as GrupoFinanceiroContrato;
     this.isVisible = true;
   }

}
