
import { ItensReposicaoDto, RessuprimentoDto } from './../../../../../models/estoque/ressuprimento-dto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItensCotacao } from 'src/models/estoque/itens-cotacao';

@Component({
  selector: 'app-lista-ressuprimento',
  templateUrl: './lista-ressuprimento.component.html',
  styleUrls: ['./lista-ressuprimento.component.css']
})
export class ListaRessuprimentoComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  @Input() title;
  @Input() listOfData: readonly ItensReposicaoDto[] = [];
  @Input() listOfCurrentPageData: readonly ItensReposicaoDto[] = [];

  total = 0;
  @Output() emitTotal: EventEmitter<any> = new EventEmitter();
  @Output() itensAnuncio: EventEmitter<ItensCotacao[]> = new EventEmitter();
  setOfCheckedId = new Set<number>();

  updateCheckedSet(idinfo: number, checked: boolean): void {


    if (checked) {
      this.setOfCheckedId.add(idinfo);

    } else {
      this.setOfCheckedId.delete(idinfo);
    }
    this.total = 0;
    let requestData:ItensCotacao[] = this.listOfData.filter(data => this.setOfCheckedId.has(data.idinfo));
    requestData.forEach(element => {
      this.total = element.subtotal;
    });
    this.emitTotal.emit(this.total);
    this.itensAnuncio.emit(requestData);
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ItensReposicaoDto[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.indeterminate = listOfEnabledData.some(({ idinfo }) => this.setOfCheckedId.has(idinfo)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .forEach(({ idinfo }) => this.updateCheckedSet(idinfo, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.idinfo));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
