import { Empresa } from './../../../../../../models/empresa';
import { ReciboDto } from './../../../../../../models/movimento/contasreceber/equipamento-recibo';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recido-outros',
  templateUrl: './recido-outros.component.html',
  styleUrls: ['./recido-outros.component.css']
})
export class RecidoOutrosComponent implements OnInit {

  @Input() recibodto: ReciboDto;
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
