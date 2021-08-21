import { ContratoDto } from './../../../../models/contrato-dto';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { AnuncioDto } from './../../../../models/anuncio-dto';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ItemProdutoAnuncio } from './../../../../models/item-produto-anuncio';
import { DescricaoAnuncio } from './../../../../models/estoque/descricao-anuncio';
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
export class BaseAnuncioProduto implements OnInit {

  validateForm!: FormGroup;
  isload: boolean = false;
  anuncios: any;
  uploading = false;
  fileList: NzUploadFile[] = [];
  grupofinanceiros: SampleDto[];
  produtos: SimpleProdutoDto[];
  isVisible = false;
  modalService: NzModalService;
  router: Router;
  isreadonly: boolean = false;
  nzMessage: NzMessageServiceModule;
  activatedRoute: ActivatedRoute;
  servicegeral: SeviceGeralService;
  utilservice: UtilsService;
  time: any;
  obj: AnuncioDto;
  controller;
  index;
  isrealy;

  fb: FormBuilder
  customIntMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };


  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 6,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  constructor(
    _router: Router,
    _fb: FormBuilder,
    _servicegeral: SeviceGeralService,
    _controller: String,
    _activatedRoute: ActivatedRoute,
    _utilservice: UtilsService
  ) {
    this.router = _router;
    this.fb = _fb;
    this.servicegeral = _servicegeral;
    this.controller = _controller
    this.obj = _servicegeral._obj;
    this.activatedRoute = _activatedRoute;
    this.utilservice = _utilservice;
  }

  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
    this.load();
    this.time = setInterval(async () => {
      // console.log(i++);

      try {
        await this.load();

      } catch (error) {

      }
    }, 500);
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
          this.anuncios = response;
          this.isload = true;
        },
        (error) => { }
      );
    this.validateForm = this.fb.group({
      grupo: [null, [Validators.required]],
    });
  }
  async load() {
    this.servicegeral.getAny(`${this.controller}/anuncio/${this.index}`)
      .then(
        (response) => {
          this.isrealy = true;
          this.obj = response;
          console.log(this.obj);

          if (this.time) {
            clearInterval(this.time);
          }

          this.isrealy = true;

        },
        (error) => { }
      );

  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.validateForm.controls[control].hasError(error);
  }

  onsave(): void {
    //console.log(this.obj);
    var valida=true;
    if(this.obj.grupopreco.id==null){
      valida=false;
    }
    if(valida){
    {
      this.servicegeral.saveobj(this.controller, this.obj, this.index)
        .then(
          rest => {

            this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso');
            /* this.servicegeral.fingbyid(this.controller, this.index)
               .then(
                 (response) => {
                   this.obj = response;
                   //console.log(response);

                   this.isrealy = true;

                 },
                 (error) => { }
               );*/
            this.load();
          }
        )
    }
  }else{
    this.servicegeral.createNotification('error','Selecine um grupo de Preço','Alerta');
  }
  }
  handleOk(): void {
    this.onsave();
    this.isVisible = false;

  }

  handleCancel(): void {

    this.isVisible = false;
  }


  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
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
    descricao.produto = {};
    this.obj.itensProduto.push(descricao);
  }
  excluirproduto(id): void {
    console.log(id);
    this.obj.itensProduto.splice(id, 1);
    /*this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja excluir produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.obj.itensProduto.splice(id, 1);
      }
    })
    */
  }
  selectproduto(item, i) {
    let p = this.produtos.filter(el => el.id == item);
    console.log(p[0]);
    this.obj.itensProduto[i].valor = p[0].valor;
    this.obj.itensProduto[i].produto = p[0];
    this.obj.itensProduto[i].subtotal = p[0].valor * this.obj.itensProduto[i].quantidade;

  }

  save() {
    this.obj.id= this.index;
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
  beforeclonecontrato() {
    this.obj.contrato = { id: 0 } as SampleDto;
    this.isVisible = true;
  }
  cloneWeb() {

    let anuncioclone: AnuncioDto = this.obj;
    console.log((anuncioclone));

    anuncioclone.id = null;
    this.servicegeral.newobj('anuncioweb', anuncioclone)
      .then(
        rest => this.utilservice.createNotification('success', 'Sucesso', 'Novo anuncio criado com sucesso')
      )

    this.obj = this.index;
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  handleUpload(): void {

    let formData = new FormData();

    this.fileList.forEach((file: any) => {
      formData.append('file', file);

    });
    this.servicegeral.uploadfile(this.controller, this.index, formData)
      .then(
        (rest) => {
        //  console.log(rest);
         //this.obj.imagemView = rest;//this.sanitizer.bypassSecurityTrustResourceUrl(this.produto.imagemView);
         this.load();
          this.uploading = false;
          this.fileList = [];

        }
      )
    this.uploading = true;
  }
}
