import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { Component, Input, OnInit } from '@angular/core';
import { Patrimonio } from 'src/models/patrimonio';

@Component({
  selector: 'app-patrimonio-data-patrimonio',
  templateUrl: './patrimonio-data-patrimonio.component.html',
  styleUrls: ['./patrimonio-data-patrimonio.component.css']
})
export class PatrimonioDataPatrimonioComponent implements OnInit {

  @Input() patrimonio: Patrimonio;
  @Input() controller;
  modelos: string[];
  inputmodelo?: string;
  tipopatrimonio: string[];
  tipo?: string;
  filteredOptions: string[] = [];

  dateFormat='dd/MM/yyyy';

  constructor(
    public servicegeral: SeviceGeralService) { }

  ngOnInit(): void {
    this.servicegeral.getnomes('modelos')
      .then(
        rest => {
          this.modelos = rest;
          this.filteredOptions = this.modelos;

        }
      )
    this.servicegeral.getAll(this.controller + '/tipopatrimonio')
      .then(
        rest => {
          this.tipopatrimonio = rest;

        }
      )
  }

  onChange(value: string): void {
    this.filteredOptions = this.modelos.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    ;
  }
}
