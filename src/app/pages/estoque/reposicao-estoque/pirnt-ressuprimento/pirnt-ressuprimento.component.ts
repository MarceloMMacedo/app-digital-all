import { ItensReposicaoDto } from './../../../../../models/estoque/ressuprimento-dto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pirnt-ressuprimento',
  templateUrl: './pirnt-ressuprimento.component.html',
  styleUrls: ['./pirnt-ressuprimento.component.css']
})
export class PirntRessuprimentoComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  @Input() title;
  @Input() listOfData: readonly ItensReposicaoDto[] = [];
  @Input() listOfCurrentPageData: readonly ItensReposicaoDto[] = [];
  @Input() total ;
  @Output() emitTotal: EventEmitter<any> = new EventEmitter();
  setOfCheckedId = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }

}
