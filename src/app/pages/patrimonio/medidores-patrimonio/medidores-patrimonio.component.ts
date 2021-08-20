import { Patrimonio } from 'src/models/patrimonio';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medidores-patrimonio',
  templateUrl: './medidores-patrimonio.component.html',
  styleUrls: ['./medidores-patrimonio.component.css']
})
export class MedidoresPatrimonioComponent implements OnInit {
  @Input() patrimonio: Patrimonio;
  @Input() controller;
  constructor() { }

  ngOnInit(): void {
  }

}
