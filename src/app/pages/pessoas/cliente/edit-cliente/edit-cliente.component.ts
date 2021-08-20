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
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  controller = 'clientes';
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
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService,
    private newobject: NewObjectService
  ) { }

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
          console.log(response);
          this.isrealy = true;
        },
        (error) => { }
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
  pessoaChange(p) {
    this.pessoa = p;
  }

  enderecoChange(e) {
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
}
