import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { Empresa } from './../../../../../models/empresa';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-componente-data-gral',
  templateUrl: './componente-data-gral.component.html',
  styleUrls: ['./componente-data-gral.component.css']
})
export class ComponenteDataGralComponent implements OnInit {

  @Input() empresa: Empresa;
  @Input() isready: boolean;

  @Output() empresaChange: EventEmitter<Empresa> = new EventEmitter<Empresa>();


  submitForm(): void {

  }


  constructor(
    private fb: FormBuilder,
    private serviceGeral: SeviceGeralService) { }

  ngOnInit(): void {

  }

  opdatecnpj() {
    let cnpj = this.empresa.cnpj;
    this.serviceGeral.getAll(`empresas/newempresa/${cnpj}`)
      .then(
        (rest) => {
          this.empresa = rest
          console.log(rest);
          this.isready = true;

          this.empresaChange.emit(this.empresa);

        }
      )
  }

  getendereco() {
    let cep = this.empresa.cep;
    this.serviceGeral.getAll(`empresas/getendereco/${cep}`)
      .then(
        (rest) => {
          this.empresa.cep = rest.cep;
          this.empresa.complemento = rest.complemento;
          this.empresa.ddd = rest.ddd;
          this.empresa.gia = rest.gia;
          this.empresa.ibge = rest.ibge;
          this.empresa.localidade = rest.localidade;
          this.empresa.logradouro = rest.logradouro;
          this.empresa.numero = rest.numero
          this.empresa.siafi = rest.siafi;
          this.empresa.uf = rest.uf;
          this.empresa.bairro = rest.bairro;

          this.empresaChange.emit(this.empresa);
        }
      )
  }

}

