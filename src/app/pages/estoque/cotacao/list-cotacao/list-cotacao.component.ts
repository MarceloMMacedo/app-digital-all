import { SampleDto } from './../../../../../models/sample-dto';

import { ListCotacaoDto } from './../../../../../models/estoque/list-cotacao-dto';
import { debounceTime } from 'rxjs/operators';
import { SeviceGeralService } from 'src/services/sevice-geral.service';

import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ListGenericClass } from 'src/app/pages/genericclasses/list-generic-class';
import { CotacaoDto } from 'src/models/estoque/cotacao-dto';
@Component({
  selector: 'app-list-cotacao',
  templateUrl: './list-cotacao.component.html',
  styleUrls: ['./list-cotacao.component.css']
})
export class ListCotacaoComponent extends ListGenericClass implements OnInit {

  fornecedores: SampleDto[];
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'cotacoes', 'estoque/cotacoes/edit-cotacao');
  }

  ngOnInit(): void {
this.servicegeral.getAllsampledto('fornecedores')
.then(
  (rest)=>{
    this.fornecedores=rest;
  }
)

    this.getLista();
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
    });
    this.time = setInterval(() => {

      this.isrealy = false;
      try {
        this.getLista()
      } catch (error) {

      }
    }, 100);

    this.validateForm = this.fb.group({
      fornecedor: [null, [Validators.required]],

    })
    this.obj={fornecedor:{id:0}} as CotacaoDto;
  }
  getLista() {
    this.servicegeral.getAnyPage(`${this.controller}/findallpagecotacaodto`, this.value, this.page - 1)
      .then(
        (response) => {
          console.log(response);

          this.pages = response;
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(): void {
console.log(this.obj);

    this.servicegeral.newobj(this.controller, this.obj)
      .then(
        (response) => {
          console.log(response.body);
           this.router.navigate([this.redirectedit, response.body]);
        },
        (error) => {
          console.log(error);

        }
      )


  }

}
