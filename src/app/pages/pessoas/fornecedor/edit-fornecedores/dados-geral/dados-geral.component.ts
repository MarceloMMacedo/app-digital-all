import { Contato } from './../../../../../../models/contato';
import { Endereco } from './../../../../../../models/endereco';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { Pessoa } from './../../../../../../models/pessoa';

import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dados-geral',
  templateUrl: './dados-geral.component.html',
  styleUrls: ['./dados-geral.component.css']
})
export class DadosGeralComponent implements OnInit {
  @Input() pessoaedit: Pessoa;
  @Input() controller: string;

  @Output() pessoaChange: EventEmitter<Pessoa> = new EventEmitter<Pessoa>();

  constructor(
    private serviceGeral: SeviceGeralService
  ) { }

  ngOnInit(): void {
  }
  opdatecnpj() {
    this.serviceGeral.getcnpj(this.controller, this.pessoaedit.id, this.pessoaedit.cnpj)
      .then(
        (rest) => {
          let e: Endereco[] = this.pessoaedit.enderecos;;
          let c: Contato[] = this.pessoaedit.contatos;
          this.pessoaedit = rest;
          this.pessoaedit.enderecos = e;
          this.pessoaedit.contatos = c;
          console.log(rest);
          //  this.isready = true;

          this.pessoaChange.emit(this.pessoaedit);

        }
      )
  }
}
