import { UtilsService } from './../../../../../services/utils.service';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { Pessoa } from './../../../../../models/pessoa';
import { FornecedorProduto } from './../../../../../models/estoque/fornecedor-produto';
import { SampleDto } from './../../../../../models/sample-dto';
import { BaseDto } from './../../../../../models/base-dto';



import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditGeneric } from 'src/app/pages/genericclasses/edit-generic';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit-produtos.component.html',
  styleUrls: ['./edit-produtos.component.css']
})
export class EditProdutosComponent extends EditGeneric implements OnInit {

  categorias: [];
  unidades: [];
  fornecedores: BaseDto[];
  modelos: SampleDto[];
  fornecedorProduto: FornecedorProduto = {} as FornecedorProduto;
  cnpjcpf = '';
  nomefornecedor = '';

  fornecedor: Pessoa;
  isVisible = false;
  iseditfornecedores = false;
  idexfornecedorproduto;
  validateForfornecedor!: FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
  ) {
    super(router, servicegeral, 'produtos', activatedRoute, utilservice); }

  ngOnInit(): void {
    super.ngOnInit();
    this.fornecedorProduto = {} as FornecedorProduto;
    this.fornecedorProduto.fornecedor = {} as BaseDto;
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      remember: [true]
    });

    this.validateForfornecedor = this.fb.group({
      fornecedor: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      remember: [true]
    });



    //unidades
    this.servicegeral.getlistageral('produtos', 'listaunidade')
      .then(
        rest => {
          this.unidades = rest;
        }
      )
    //categoria
    this.servicegeral.getlistageral('produtos', 'listacategoriaproduto')
      .then(
        rest => {
          this.categorias = rest;
        }
      )
    this.getmodelos();
    this.getAllFornecedores();
  }
  getmodelos() {
    this.servicegeral.getAll('modelos')
      .then(
        (response) => {
          this.modelos = response;
          console.log(response);
        },
        (error) => { }
      )
  }
  onSave() {

    let img =this.obj.imagem;
   this.obj.imagem = null;
    this.servicegeral.saveobj(this.controller,this.obj, this.index)
      .then(
        (response) => {
          this.utilservice.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');
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
   this.obj.imagem = img;
  }

  showModal(): void {
    this.cnpjcpf = '';
    this.nomefornecedor = '';
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.iseditfornecedores = false;
    // this.showConfirm();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.iseditfornecedores = false;
  }
  isCPF(): boolean {
    return this.cnpjcpf == null ? true : this.cnpjcpf.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getfornecedorprocnpj() {
    this.servicegeral.getcnpj('fornecedores', '0', this.cnpjcpf)
      .then(
        (rest) => {
          this.fornecedor = rest;
          this.nomefornecedor = this.fornecedor.nome;
        }
      )
  }
  showConfirmincluirfornecedor(): void {
    this.modalService.confirm({
      nzTitle: 'Confirmação',
      nzContent: 'Deseja incluir fornecedor: ' + this.nomefornecedor,
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.fornecedor.cnpj = this.cnpjcpf;
        this.fornecedor.nome = this.nomefornecedor;
        console.log(this.fornecedor);

        this.servicegeral.newobj('fornecedores', this.fornecedor).then(
          res => {
            this.message.success('Fornecedo cadastrado com sucesso', { nzDuration: 1000 });
            this.isVisible = false;
            this.getAllFornecedores()
          }

        )
      }
    });
  }
  getAllFornecedores() {
    this.servicegeral.getAllsample('fornecedores')
      .then(
        (rest) => {
          this.fornecedores = rest;
          console.log(rest);

        }
      )

  }
  newfornecedores() {
    // this.getAllFornecedores();
    this.fornecedorProduto = {} as FornecedorProduto;
    this.fornecedorProduto.fornecedor = {} as BaseDto;
    this.iseditfornecedores = true;
    this.idexfornecedorproduto=0;

  }
  submitFornecedor(): void {
    for (const i in this.validateForfornecedor.controls) {
      this.validateForfornecedor.controls[i].markAsDirty();
      this.validateForfornecedor.controls[i].updateValueAndValidity();
    }
  }
  newfornecedorproduto() {
    this.idexfornecedorproduto=0;
    this.fornecedorProduto={} as FornecedorProduto;
  }
  inserirfornecedor() {
if(this.idexfornecedorproduto==0)
this.obj.fornecedoresproduto.push(this.fornecedorProduto);
    let img =this.obj.imagem;
   this.obj.imagem = null;
    this.servicegeral.saveobj('produtos',this.obj,this.obj.id)
      .then(
        (response) => {

          this.utilservice.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');

          this.iseditfornecedores = false;
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
   this.obj.imagem = img;
  }
  setfornecedorproduto(value: FornecedorProduto) {

    this.fornecedorProduto = value;
    this.iseditfornecedores = true;
  }
  excluirfornecedorproduto(obj, i) {
    this.modalService.confirm({
      nzTitle: 'Confirmação',
      nzContent: 'Deseja Excluir fornecedor: ' + obj,
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
       this.obj.fornecedoresproduto.splice(i, 1);
        this.servicegeral.saveobj('produtos',this.obj,this.obj.id)
          .then(
            (response) => {

              this.utilservice.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');

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
    });
  }

}
