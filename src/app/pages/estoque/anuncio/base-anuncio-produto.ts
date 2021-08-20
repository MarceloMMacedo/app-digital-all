import { ItemProdutoAnuncio } from './../../../../models/item-produto-anuncio';
import { DescricaoAnuncio } from './../../../../models/estoque/descricao-anuncio';
import { AnuncioLoja } from './../../../../models/estoque/anuncio-loja';
import { SimpleProdutoDto } from './../../../../models/estoque/simple-produto-dto';
import { SampleDto } from './../../../../models/sample-dto';
import { EditGeneric } from './../../genericclasses/edit-generic';
import { UtilsService } from './../../../../services/utils.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService, NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
@Component({
  template: ''
})
export class BaseAnuncioProduto extends EditGeneric  implements OnInit {

  validateForm!: FormGroup;
  isload: boolean = false;
  anuncios : any;

  grupofinanceiros: SampleDto[];
  produtos: SimpleProdutoDto[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
    private modalService1: NzModalService,private fb: FormBuilder,
  ) {
    super(router, servicegeral, 'patrimonios', activatedRoute, utilservice);
  }
  ngOnInit(): void {
    this.servicegeral.getAllsampledto('grupofinanceiroanuncio')
      .then(
        rest => {
          this.grupofinanceiros = rest;
          console.log(rest);

        }
      )

    this.servicegeral.listany('produtos')
      .then(
        rest => {
          this.produtos = rest;
          console.log(rest);
        }
      )
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.anuncios  = response;
          this.isload = true;
        },
        (error) => { }
      );
    this.validateForm = this.fb.group({
      produto: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      remember: [true]
    });
    super.ngOnInit();
  }
  adddescricao() {
    let descricao: DescricaoAnuncio = {} as DescricaoAnuncio;
    this.obj.descricoes.push(descricao);
  }
  excluirdescricao(id): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja excluir descrição',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.obj.descricoes.splice(id, 1);
      }
    })
  }
  addproduto() {
    let descricao: ItemProdutoAnuncio = {} as ItemProdutoAnuncio;
    descricao.produto={};
    this.obj.itensProduto.push(descricao);
  }
  excluirproduto(id): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja excluir produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.obj.itensProduto.splice(id, 1);
      }
    })
  }
  selectproduto(item, i) {
    let p = this.produtos.filter(el => el.id == item);
    console.log(p[0]);
    this.obj.itensProduto[i].valor=p[0].valor;
    this.obj.itensProduto[i].produto = p[0];
    this.obj.itensProduto[i].subtotal=p[0].valor * this.obj.itensProduto[i].quantidade;

  }

  save() {
    this.servicegeral.saveobj(this.controller, this.obj, this.index)
      .then(
        (response) => {
          this.utilservice.createNotification('success', 'Produto atualizado', 'Dados Salvo Com Socesso');
          this.servicegeral.fingbyid(this.controller, this.index)
            .then(
              (response) => {
                this.obj = response;
              },
              (error) => { }
            )
        },
        (error) => { }
      )
  }
  cloneWeb(){

        let anuncioclone:AnuncioLoja=this.obj;
        anuncioclone.id=null;
        this.servicegeral.newobj('anuncioweb',anuncioclone)
        .then(
          rest=>this.utilservice.createNotification('success','Sucesso','Novo anuncio criado com sucesso')
        )



  }
}
