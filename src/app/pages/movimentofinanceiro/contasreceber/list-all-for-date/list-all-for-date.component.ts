import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResumoMovimento } from './../../../genericclasses/base-resumo-movimento';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


import { UtilsService } from './../../../../../services/utils.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
@Component({
  selector: 'app-list-all-for-date',
  templateUrl: './list-all-for-date.component.html',
  styleUrls: ['./list-all-for-date.component.css']
})
export class ListAllForDateComponent  extends BaseResumoMovimento implements OnInit {


  clickedElement: Subscription = new Subscription();
  constructor(
    public modalService: NzModalService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
  ) {
    super(modalService, router, message, servicegeral, '', '/');
    let data = new Date();

    this.datafim =    new Date(data.getFullYear(),12,30,0,0,0,0);
    this.datainicio = data;//this.datePipe.transform(data,"dd/MM/yyyy");

  }

  ngOnInit(): void {
    console.log('element clicked');

    super.ngOnInit();

    //console.log(2);
    this.servicegeral.getAllsampledto('clientes')
      .then(
        rest => {
          this.clientes = rest;
          this.cliente = this.clientes[0];

          this.onLoad();
        }
      )
    //console.log(3);
    if (this.isrealy) {
    }
  }
  changeload(event){
    this.onLoad()
  }
  onLoad() {
    if (this.clientes.length > 0) {
      this.controllerAberto = `contasreceber/contasreceberaberto?inicio=${this.datainicio}&fim=${this.datafim}`;
      this.controllerQuit = `contasreceber/contasreceberquit?inicio=${this.datainicio}&fim=${this.datafim}`;
      super.onLoad();
    }
  }

}
