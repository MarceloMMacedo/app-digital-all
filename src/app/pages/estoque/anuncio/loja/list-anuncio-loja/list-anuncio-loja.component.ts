import { AnuncioDto } from './../../../../../../models/anuncio-dto';
import { debounceTime } from 'rxjs/operators';
import { ItemProdutoAnuncio } from './../../../../../../models/item-produto-anuncio';
import { SampleDto } from './../../../../../../models/sample-dto';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { ListGenericClass } from './../../../../genericclasses/list-generic-class';


import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-anuncio-loja',
  templateUrl: './list-anuncio-loja.component.html',
  styleUrls: ['./list-anuncio-loja.component.css']
})
export class ListAnuncioLojaComponent extends ListGenericClass implements OnInit {

  controller = 'anunciosloja';
  validateForm!: FormGroup;
  produtos: SampleDto[];
  grupofinanceiros: SampleDto[];
  grupofinanceiro: SampleDto;
    nome;
  produto: SampleDto;
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'anunciosloja', 'estoque/anuncios/anunciosloja/');

  }

  ngOnInit(): void {

    super.getLista();
    this.inicio();
    this.servicegeral.getAllsampledto('grupofinanceiroanuncio')
    .then(
      rest => {
        this.grupofinanceiros = rest;
        console.log(rest);
      }
    )
    this.servicegeral.getAllsampledto('produtos')
      .then(
        (rest) => {
          this.produtos = rest;
          console.log(rest);
        }
      );
    this.validateForm = this.fb.group({
      produto: [null, [Validators.required]],
      nome: [null, [Validators.required]],
        categoria: [null, [Validators.required]],
      //   unidade: [null, [Validators.required]],
      remember: [true]
    });

    console.log(this.controller);

  }
  inicio(){

    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
      ;
    });

  }
  onChange(value: { id: number, nome: string }): void {
    this.nome = value.nome;

  }
  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir Produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.obj = {} as AnuncioDto;
        this.obj.itensProduto = []
        let it: ItemProdutoAnuncio = {} as ItemProdutoAnuncio;
        it.produto = {} as SampleDto;
        it.produto.id = this.produto.id;

        it.quantidade = 1;
        this.obj.itensProduto.push(it);
        this.obj.nome = this.nome;
        this.obj.grupopreco=this.grupofinanceiro;
        console.log(this.obj);

        this.servicegeral.newobj(this.controller, this.obj).then(
          (rest) =>
            this.router.navigate(['estoque/anuncios/anunciosloja/', rest.body])
        )
      }
    })
  }


}
