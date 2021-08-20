import { ContratoDto } from 'src/models/contrato-dto';
import { Component, Input, OnInit } from '@angular/core';
declare var require: any;
@Component({
  selector: 'app-print-contrato',
  templateUrl: './print-contrato.component.html',
  styleUrls: ['./print-contrato.component.css'],

})
export class PrintContratoComponent implements OnInit {

  @Input() contrato: ContratoDto;
  @Input() periodo;
  @Input()  valor;
  @Input() dataforum;

  constructor() { }

  ngOnInit(): void {

  }

}
