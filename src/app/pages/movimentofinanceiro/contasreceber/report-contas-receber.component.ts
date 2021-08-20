import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { ResumoContasReceber } from './../../../../models/report/resumo-contas-receber';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-report-contas-receber',
  templateUrl: './report-contas-receber.component.html',
  styleUrls: ['./report-contas-receber.component.css']
})
export class ReportContasReceberComponent implements OnInit {
  ano;
  time;
  isrealy: boolean = false;
  resumo: ResumoContasReceber;

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(
    private service: SeviceGeralService,) { }

  ngOnInit(): void {
    let data = new Date();
    var dia = data.getDate();
    var dias = data.getDay();
    var mes = data.getMonth();
    this.ano = data.getFullYear();
    this.filterexercicio();
  }
  filterexercicio(): void {
    this.service.getAll(`reportfinanceiro/contasReceber/${this.ano}`)
      .then(
        rest => {
          console.log(rest);

          this.resumo = rest;
          this.isrealy = true;
          this.barChartLabels = this.resumo.lineChartLabels;
          this.barChartData = [this.resumo.chartscontrato, this.resumo.chartsservicos, this.resumo.chartsvendas]
     //     this.chart.chart.update(); // This re-renders the canvas element.

        }
      )
  }
}
