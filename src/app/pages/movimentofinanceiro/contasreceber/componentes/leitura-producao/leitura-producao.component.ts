import { CurrencyMaskInputMode } from 'ngx-currency';
import { FaturasDto } from './../../../../../../models/faturas-dto';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FichaLeitura } from './../../../../../../models/movimento/contasreceber/ficha-leitura';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patrimonio } from 'src/models/patrimonio';

@Component({
  selector: 'app-leitura-producao',
  templateUrl: './leitura-producao.component.html',
  styleUrls: ['./leitura-producao.component.css']
})
export class LeituraProducaoComponent implements OnInit {
  @Input() fichaleituras: FichaLeitura[];
  @Input() fatura: FaturasDto;

  @Input() isrealy;
  @Output() visiblerecibo: EventEmitter<boolean> = new EventEmitter();

  @Output() onload: EventEmitter<boolean> = new EventEmitter();
  dateFormat = 'dd/MM/yyyy';

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


  constructor(
    private notification: NzNotificationService,
    public servicegeral: SeviceGeralService) { }

  ngOnInit(
  ): void {
    console.log(this.fatura);

  }
  onLoad(){
    this.onload.emit(true);
  }
  onValidar() {
    let valido: boolean = true;
    this.fichaleituras.forEach(element => {
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
    if (!valido) {
      this.notification.error("Erro Validação", "Tem um erro na infomação de medidores inferior com medidor anterior ou uma data aberta")
    }
    console.log(this.fatura);

    if (valido) {
      this.fichaleituras.forEach(element => {

        var num = String(element.itensContratoPatrimonio.patrimonio.id);
         element.medidores.medidorA3Inicial = element.medidorAnteriorA3;
        element.medidores.medidorA4Inicial = element.medidorAnteriorA4;
        this.servicegeral.fingbyid('patrimonios', num)
          .then(
            rest => {
              let p: Patrimonio = rest;
              console.log(rest);

              p.medidorContrato.medidorA3Final = element.medidores.medidorA3Final;
              p.medidorContrato.medidorA4Final = element.medidores.medidorA4Final;

              p.medidorContrato.medidorA3Inicial = element.medidores.medidorA3Final;
              p.medidorContrato.medidorA4Inicial = element.medidores.medidorA4Final;
              this.servicegeral.saveobj('patrimonios', p, num).then(() => { });
            }
          )

        element.status = 'Quit'
      })

      this.servicegeral.saveobj('faturacontratos', this.fatura, this.fatura.id)
        .then(rest => {
          this.servicegeral.fingbyid('faturacontratos', String(this.fatura.id))
            .then(
              () => { }
            )
          this.notification.success('Sucesso', "Dados Salvos com sucesso!!!")
        }
        )

    this.visiblerecibo.emit(false);
    this.onload.emit(true);
  }
  }
}
