import { ContasPagar } from 'src/models/movimento/contas-pagar';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-list-contaspagar',
  templateUrl: './items-list-contaspagar.component.html',
  styleUrls: ['./items-list-contaspagar.component.css']
})
export class ItemsListContaspagarComponent implements OnInit {

  @Input() contaspagar: ContasPagar
  constructor() { }

  ngOnInit(): void {
  }

}
