import { FichaLeitura } from './../../../../../../models/movimento/contasreceber/ficha-leitura';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { ReciboContratoDto } from './../../../../../../models/movimento/contasreceber/equipamento-recibo';
import { BaseResumoMovimento } from './../../../../genericclasses/base-resumo-movimento';
import { PrintCs } from './../../../../genericclasses/print-cs';
import { Empresa } from './../../../../../../models/empresa';
import { FaturasDto } from './../../../../../../models/faturas-dto';
import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-contratos',
  templateUrl: './list-contratos.component.html',
  styleUrls: ['./list-contratos.component.css']
})
export class ListContratosComponent implements OnInit {

  @Input() faturasContrato?: FaturasDto[]
  @Input() totalServico?: number;
  @Input() empresa: Empresa;
  @Input() isrealy;
  @Input() titulo: string;
  fatura: FaturasDto;
  ficha: FichaLeitura[];
  isVisible: boolean = false;
  isVisibleoutro: boolean = false;
  isVisiblebaixaroutros: boolean = false;
  isVisiblebaixar: boolean = false;
  isVisiblemedidor: boolean = false;
  recibodto: ReciboContratoDto;

  @Output() onload: EventEmitter<boolean> = new EventEmitter();

  clickedElement: Subscription = new Subscription();
  constructor(
    public servicegeral: SeviceGeralService,
  ) { }

  ngOnInit(): void {
    //printSectionId="componentID" printTitle="Recibo Contrato" ngxPrint [useExistingCss]="true"

  }

  print(data: FaturasDto) {
    console.log(data.origem);

    if (data.origem == 'Venda') {
      this.servicegeral.getAny(`contasreceber/recibovenda/${data.id}`)
        .then(
          rest => {
            this.recibodto = rest;
            this.isVisibleoutro = true;
          }
        )
    }
    if (data.origem == 'Contrato') {
      this.servicegeral.getAny(`contasreceber/recibocontrato/${data.id}`)
        .then(
          rest => {
            this.recibodto = rest;
            this.isVisible = true;
          }
        )
    } if (data.origem == 'Servico') {
      this.servicegeral.getAny(`contasreceber/reciboservico/${data.id}`)
        .then(
          rest => {
            this.recibodto = rest;
            this.isVisibleoutro = true;
          }
        )
    }
  }
  medidorfaturamento(f: FaturasDto) {
    this.fatura = f;
    this.ficha = f.fichaLeitura;
    this.isVisiblemedidor = true;
  }
  handleCancelforn(): void {
    this.isVisible = false;
    this.isVisiblemedidor = false;
    this.isVisibleoutro = false;
    this.isVisiblebaixar = false;
    this.isVisiblebaixaroutros = false;
  }
  showModal(f: FaturasDto) {
    this.fatura = f;
    if (f.origem == 'Contrato') {
      this.isVisiblebaixar = true;
    }
    if (f.origem != 'Contrato') {
      this.isVisiblebaixaroutros = true;
    }
  }
  baixaroutro(f: FaturasDto) {
    this.fatura = f;
    this.isVisiblebaixaroutros = true;
  }
  handleCancel() {
    this.isVisible = false;
    this.isVisiblemedidor = false;
    this.isVisibleoutro = false;
    this.isVisiblebaixar = false;
    this.isVisiblebaixaroutros = false;
  }
  handleOk() {
    this.isVisible = false;
    this.isVisiblemedidor = false;
    this.isVisibleoutro = false;
    this.isVisiblebaixaroutros = false;
    this.isVisiblebaixar = false;
  }
  changevisible(event) {
    this.isVisiblemedidor = event;
    this.isVisible = event;
    this.isVisiblebaixar = event;
  }
  changeonload(event) {
    this.onload.emit(event);
  }
  changeficha(event, f) {

  }
}
