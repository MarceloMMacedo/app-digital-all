import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-cotacao',
  templateUrl: './report-cotacao.component.html',
  styleUrls: ['./report-cotacao.component.css']
})
export class ReportCotacaoComponent implements OnInit {

  constructor() { }
 @Input() listOfData;
  ngOnInit(): void {
  }

}
