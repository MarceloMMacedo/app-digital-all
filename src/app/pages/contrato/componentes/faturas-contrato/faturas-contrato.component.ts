import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { FaturasDto } from './../../../../../models/faturas-dto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-faturas-contrato',
  templateUrl: './faturas-contrato.component.html',
  styleUrls: ['./faturas-contrato.component.css']
})
export class FaturasContratoComponent implements OnInit {
  @Input() faturas: FaturasDto[];
  @Input() descricao;
  @Input() id;

  @Output() atualizar: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public servicegeral: SeviceGeralService,
  ) { }

  ngOnInit(): void {

  }

}
