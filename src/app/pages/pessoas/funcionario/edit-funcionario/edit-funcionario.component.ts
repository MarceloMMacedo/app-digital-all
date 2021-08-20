import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Contato } from './../../../../../models/contato';
import { NewObjectService } from './../../../../../services/new-object.service';
import { Endereco } from './../../../../../models/endereco';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from './../../../../../models/pessoa';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {

  uploading = false;
  fileList: NzUploadFile[] = [];
  controller = 'funcionarios';
  isrealy: boolean = false;
  index;
  isVisible = false;
  cnpjcpf = '';
  nomefornecedor = '';
  pessoa: Pessoa;

  validateForfornecedor!: FormGroup;

  iseditfornecedores = false;
  idexfornecedorproduto;
  validateForm!: FormGroup;
  ferias = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  rules: [];
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService,
    private newobject: NewObjectService
  ) { }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      remember: [true]
    });


    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.pessoa = response;
          if (this.pessoa.contato == null) {
            this.pessoa.contato = this.newobject.contato;
          }
          if (this.pessoa.endereco == null) {
            this.pessoa.endereco = this.newobject.endereco;
          }
          console.log(response);
          this.isrealy = true;
        },
        (error) => { }
      )
    this.servicegeral.getlistageral(this.controller, 'listarules')
      .then(
        rest=>{
          console.log(rest);

          this.rules=rest;
        }
      )
  }

  onsave(): void {
    console.log(this.pessoa);
    this.servicegeral.saveobj(this.controller, this.pessoa, this.index)
      .then(
        rest => {

          this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso')
        }
      )

  }
  pessoaChange(p: Pessoa) {
    this.pessoa = p;
  }

  enderecoChange(e: Endereco) {
    this.pessoa.endereco = e;
    console.log(e);

  }
  novoendereco(): void {
    let e: Endereco = this.newobject.endereco;
    this.pessoa.enderecos.push(e);
  }
  novocontato(): void {
    let e: Contato = this.newobject.contato;
    this.pessoa.contatos.push(e);
  }
  enderecosChange(event, i) {
    console.log(event);
    this.pessoa.enderecos[i] = event;
    console.log(this.pessoa);

  }

  savaImagem(event): void {
    const foto = event.target.files[0];
    const formData = new FormData();
    formData.set('file', foto);
    //console.log(foto);

  }
  handleUpload(): void {

    let formData = new FormData();
    // tslint:disable-next-line:no-any
    //console.log(this.fileList);

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      //console.log(formData);

    });
    this.servicegeral.uploadfile(this.controller, this.index, formData)
      .then(

        (rest) => {
          //console.log(rest);
          this.pessoa.imagem = rest.body;
          this.uploading = false;
          this.fileList = [];

        }
      )
    this.uploading = true;
  }
}
