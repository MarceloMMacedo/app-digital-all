import { CurrencyMaskInputMode } from 'ngx-currency';
import { BaseDto } from './../../../../../models/base-dto';
import { ItensContratoPatrimonio } from './../../../../../models/itens-contrato-patrimonio';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmitOutput } from 'typescript';

@Component({
  selector: 'app-equipamento-contrato',
  templateUrl: './equipamento-contrato.component.html',
  styleUrls: ['./equipamento-contrato.component.css']
})
export class EquipamentoContratoComponent implements OnInit {

  @Input() itempatrimoniocontrato: ItensContratoPatrimonio;
  @Input() patrimonios: BaseDto[];
  @Output() item: EventEmitter<ItensContratoPatrimonio> = new EventEmitter<ItensContratoPatrimonio>();
  @Output() itemrevove: EventEmitter<number> = new EventEmitter<number>();

  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 6,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  customCurrencyMaskConfig2 = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  customIntMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };



  constructor() { }

  ngOnInit(): void {
  }
  loaddata() {
    console.log(this.itempatrimoniocontrato);

    this.item.emit(this.itempatrimoniocontrato);
  }
  removitem() {

    this.itemrevove.emit(0);
  }
}
