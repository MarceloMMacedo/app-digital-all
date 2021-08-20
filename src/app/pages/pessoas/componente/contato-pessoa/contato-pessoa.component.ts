

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Contato } from './../../../../../models/contato';
import { Endereco } from './../../../../../models/endereco';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contato-pessoa',
  templateUrl: './contato-pessoa.component.html',
  styleUrls: ['./contato-pessoa.component.css']
})
export class ContatoPessoaComponent implements OnInit {

  @Input() contato: Contato;
  @Output() contatoChange: EventEmitter<Contato> = new EventEmitter<Contato>();

  constructor(private fb: FormBuilder,
    private serviceGeral: SeviceGeralService) { }

  ngOnInit(): void {
  }



}
