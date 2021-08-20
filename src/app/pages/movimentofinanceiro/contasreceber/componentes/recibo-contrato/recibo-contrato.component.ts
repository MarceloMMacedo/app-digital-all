import { ReciboContratoDto } from './../../../../../../models/movimento/contasreceber/equipamento-recibo';
import { FaturasDto } from './../../../../../../models/faturas-dto';
import { Empresa } from './../../../../../../models/empresa';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recibo-contrato',
  templateUrl: './recibo-contrato.component.html',
  styleUrls: ['./recibo-contrato.component.css']
})
export class ReciboContratoComponent implements OnInit {

  @Input() recibodto: ReciboContratoDto;
  @Input() totalServico?: number;
  @Input() empresa: Empresa;
  @Input() isrealy;
  data;
  @Output() visiblerecibo: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.data = new Date();
  }
  onclose() {
    this.visiblerecibo.emit(false);
  }
}
