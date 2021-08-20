import { NbAccessChecker } from '@nebular/security';
import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { ItemMonthReportDto } from './../../../../models/report/item-month-report-dto';

import { Component, OnInit } from '@angular/core';
import { ReportResumoDto } from 'src/models/report/report-resumo-dto';
import { ReportTable } from 'src/models/report/report-table';
@Component({
  selector: 'app-resumofinanceiro',
  templateUrl: './resumofinanceiro.component.html',
  styleUrls: ['./resumofinanceiro.component.css']
})
export class ResumofinanceiroComponent implements OnInit {
  ano;
  time;
  resumoFuturos: ReportResumoDto;
  resumoRealizados: ReportResumoDto;

  itemMonthReportFuturos: ItemMonthReportDto[];
  itemMonthReportRealizados: ItemMonthReportDto[];
  isrealy: boolean = false;
  isrealyrealizados: boolean = false;
  stuturaheard: {
    index: number,
    mes: string;
  }
  constructor(
    private service: SeviceGeralService,
  ) { }

  ngOnInit(): void {

    this.resumoFuturos = {} as ReportResumoDto;
    this.resumoRealizados = {} as ReportResumoDto;
    let data = new Date();
    var dia = data.getDate();
    var dias = data.getDay();
    var mes = data.getMonth();
    this.ano = data.getFullYear();
    this.filterexercicio();
    this.time = setInterval(async () => {
      // console.log(i++);
      this.isrealy = false;
      try {

        this.filterexercicio();
      } catch (error) {

      }
    }, 500);

  }

  filterexercicio(): void {
    this.service.getAll(`reportfinanceiro/periodosinteticofuturos/${this.ano}`)
      .then(
        rest => {

          let ent: ReportTable = {} as ReportTable;
          let said: ReportTable = {} as ReportTable;

          this.itemMonthReportFuturos = rest;

          let sum = 0;
          this.itemMonthReportFuturos.forEach(a => sum += a.entradas);
          this.resumoFuturos.valorEntrada=sum;
          sum = 0;
          this.itemMonthReportFuturos.forEach(a => sum += a.saidas);
          this.resumoFuturos.valorSaida=sum;
          this.resumoFuturos.resultado=this.resumoFuturos.valorEntrada - this.resumoFuturos.valorSaida;


          console.log(rest);
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )
    this.service.getAll(`reportfinanceiro/periodosinteticorealizados/${this.ano}`)
      .then(
        rest => {

          let ent: ReportTable = {} as ReportTable;
          let said: ReportTable = {} as ReportTable;

          this.itemMonthReportRealizados = rest;
          let sum = 0;
          /*this.itemMonthReportRealizados.forEach(a => sum += a.entradas);*/
          for(let i=1;i<13;i++){
            sum += this.itemMonthReportRealizados[i].entradas;
          }
          this.resumoRealizados.valorEntrada=sum;
          sum = 0;
         /* this.itemMonthReportRealizados.forEach(a => sum += a.saidas);*/
         for(let i=1;i<13;i++){
          sum += this.itemMonthReportRealizados[i].saidas;
        }
          this.resumoRealizados.valorSaida=sum;
          this.resumoRealizados.resultado=this.resumoRealizados.valorEntrada - this.resumoRealizados.valorSaida;

          console.log(rest);
          this.isrealyrealizados = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )


  }

  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }
}


