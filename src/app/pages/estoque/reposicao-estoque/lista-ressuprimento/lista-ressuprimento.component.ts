
import { ItensReposicaoDto } from './../../../../../models/estoque/ressuprimento-dto';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {


    if (checked) {
      this.setOfCheckedId.add(id);

    } else {
      this.setOfCheckedId.delete(id);
    }
    this.total = 0;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    requestData.forEach(element => {
      this.total = element.subtotal;
    });
    this.emitTotal.emit(this.total);
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ItensReposicaoDto[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData;
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
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
