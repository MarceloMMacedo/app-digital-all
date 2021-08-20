import { Empresa } from './../../../../../models/empresa';
import { SeviceGeralService } from 'src/services/sevice-geral.service';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-contas-pagar-historico',
  templateUrl: './report-contas-pagar-historico.component.html',
  styleUrls: ['./report-contas-pagar-historico.component.css']
})
export class ReportContasPagarHistoricoComponent implements OnInit {
  @Input() contaspagar: any;
  empresa: Empresa;
  total;
  constructor( public servicegeral: SeviceGeralService) { }

  ngOnInit(): void {

  }

}
