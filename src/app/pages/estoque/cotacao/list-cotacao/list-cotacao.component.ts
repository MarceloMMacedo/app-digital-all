import { SeviceGeralService } from 'src/services/sevice-geral.service';

import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { SampleDto } from 'src/models/sample-dto';
import { ListGenericClass } from 'src/app/pages/genericclasses/list-generic-class';
@Component({
  selector: 'app-list-cotacao',
  templateUrl: './list-cotacao.component.html',
  styleUrls: ['./list-cotacao.component.css']
})
export class ListCotacaoComponent  extends ListGenericClass  implements OnInit {


  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'cotacoes', 'estoque/cotacoes/');
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
