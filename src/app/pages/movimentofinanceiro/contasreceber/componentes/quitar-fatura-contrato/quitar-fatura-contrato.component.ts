import { Banco } from './../../../../../../models/banco';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SampleDto } from './../../../../../../models/sample-dto';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FaturasDto } from 'src/models/faturas-dto';

@Component({
  selector: 'app-quitar-fatura-contrato',
  templateUrl: './quitar-fatura-contrato.component.html',
  styleUrls: ['./quitar-fatura-contrato.component.css']
})
export class QuitarFaturaContratoComponent implements OnInit {
  @Input() fatura: FaturasDto;


  @Input() isrealy;
  @Output() onload: EventEmitter<boolean> = new EventEmitter();

  @Output() visiblequitar: EventEmitter<boolean> = new EventEmitter();
  dateFormat = 'dd/MM/yyyy';

  bancos: Banco[];
  customIntMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };


  constructor(
    private notification: NzNotificationService,
    public servicegeral: SeviceGeralService) { }

  ngOnInit(): void {
    this.servicegeral.getAllsampledto('bancos')
      .then(
        (rest => this.bancos = rest)
      )
  }

  validarleitura(): boolean {
    let valido: boolean = true;
  //  if (this.fatura.origem == 'Contrato')
    {
      this.fatura.fichaLeitura.forEach(element => {
        if (element.medidores.medidorA3Final < element.medidorAnteriorA3) {
          valido = false;
        }
        if (element.medidores.medidorA4Final < element.medidorAnteriorA4) {
          valido = false;
        }
        if (element.dataLeitura === null) {
          valido = false;
        }
      });
    }
    if (this.fatura.dataPagamento === null) {
      valido = false;
    }
    if (this.fatura.banco === null) {
      valido = false;
    }
    if (!valido) {
      this.notification.error("Erro Valida????o", "Tem um erro na infoma????o de medidores inferior com medidor anterior ou uma data aberta")
    }
    return valido;
  }
  onLoad() {
    this.onload.emit(true);
  }
  onBaixa() {
    if (this.validarleitura()) {
      this.servicegeral.putobj(`contasreceber/quitar`, this.fatura)
        .then(
          rest => {
            this.notification.success('Sucesso', "Recebibento realizado com sucesso!!!")
            this.onLoad();
            this.visiblequitar.emit(false);
          }
        )
    }
  }
}
