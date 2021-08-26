import { CurrencyMaskInputMode } from 'ngx-currency';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { SampleDto } from './../../../../../models/sample-dto';
import { ItensCotacao } from './../../../../../models/estoque/itens-cotacao';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-itens-cotacao',
  templateUrl: './list-itens-cotacao.component.html',
  styleUrls: ['./list-itens-cotacao.component.css']
})



export class ListItensCotacaoComponent implements OnInit {
  item: {
    idcotacao: number,
    idanuncio: number,
    tipo: string,
    qtd: number,
  }
  customIdMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  }
  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  title;
  @Input() idcotacao: number;
  @Input() tipo: string;
  @Input() itensCotacaos?: ItensCotacao[];
  @Output() onsaveitem: EventEmitter<any> = new EventEmitter();
  @Output() deleteveitem: EventEmitter<any> = new EventEmitter();
  i = 0;
  idanuncio: any;
  qtd: number;
  isVisible = false;
  validateForm!: FormGroup;
  anuncios: SampleDto[];
  editId: number | null = null;
  constructor(
    private servicegeral: SeviceGeralService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      anuncio: [null, [Validators.required]],
      qtd: [[0, null], [Validators.required]],

    })
  }

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
  addnewitem(tipo: string) {
    this.anuncios = null;
    this.idanuncio = 0;
    this.qtd = null;
    this.title = tipo;
    this.tipo = tipo;

    this.servicegeral.getAny(`cotacoes/getanuncios/${tipo}`)
      .then(
        (rest) => {
          this.anuncios = rest;
        }

      )
    this.item = {
      idcotacao: 0,
      idanuncio: 0,
      tipo: tipo,
      qtd: 0,
    };
    this.item.idcotacao = this.idcotacao;
    this.item.tipo = this.tipo;
    this.isVisible = true;
  }

  handleCancel(): void {

    this.isVisible = false;
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  handleOk() {
    this.item = {
      idcotacao: this.idcotacao,
      idanuncio: this.idanuncio,
      tipo: this.tipo,
      qtd: this.qtd,
    };
    console.log(this.item);
    this.servicegeral.getAll(`cotacoes/addanuncio?idcotacao=${this.idcotacao}&idanuncio=${this.idanuncio}&tipo=${this.tipo}&qtd=${this.qtd}`)
      .then(
        () => {
          this.onsaveitem.emit(this.itensCotacaos);
        }
      )

    this.isVisible = false;
  }
  deletitem(id) {
    this.itensCotacaos.splice(id, 1);

    this.deleteveitem.emit(this.itensCotacaos);

  }
}
