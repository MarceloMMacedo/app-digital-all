import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { Endereco } from './../../../../../../models/endereco';


import { FormBuilder } from '@angular/forms';

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-endereco-pessoa',
  templateUrl: './endereco-pessoa.component.html',
  styleUrls: ['./endereco-pessoa.component.css']
})
export class EnderecoPessoaComponent implements OnInit {

  @Input() endereco: Endereco;
  @Input() controller: string;

  @Output() enderecoChange: EventEmitter<Endereco> = new EventEmitter<Endereco>();
  constructor(private fb: FormBuilder,
    private serviceGeral: SeviceGeralService) { }

  ngOnInit(): void {
  }

  getendereco(): void {
    this.serviceGeral.getAny(`${this.controller}/cep?cep=${this.endereco.cep}`)
      .then(
        (rest) => {
          this.endereco = rest ;
          this.enderecoChange.emit(rest);
        }
      )
  }
}
