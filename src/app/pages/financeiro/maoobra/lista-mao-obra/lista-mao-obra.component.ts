import { ListGenericClass } from 'src/app/pages/genericclasses/list-generic-class';
import { Router } from '@angular/router';
import { SeviceGeralService } from '../../../../../services/sevice-geral.service';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mao-obra',
  templateUrl: './lista-mao-obra.component.html',
  styleUrls: ['./lista-mao-obra.component.css']
})
export class ListaMaoObraComponent   extends ListGenericClass implements OnInit {



  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'anuncioservicos', 'estoque/anuncios/anunciosloja/');

  }

  ngOnInit(): void {


  }


}
