import { ListGenericClass } from './../../genericclasses/list-generic-class';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { SampleDto } from './../../../../models/sample-dto';
import { BaseDto } from './../../../../models/base-dto';
import { Component, OnInit } from '@angular/core';
import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContratoDto } from 'src/models/contrato-dto';
@Component({
  selector: 'app-list-contratos',
  templateUrl: './list-contratos.component.html',
  styleUrls: ['./list-contratos.component.css']
})
export class ListContratosComponent extends ListGenericClass implements OnInit {
  grupoFinanceiro: BaseDto[];
  clientes: BaseDto[];

  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };


  customMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'contrato', 'contratos/');

  }
  ngOnInit(): void {
    super.ngOnInit();
    this.servicegeral.getAllsampledto('clientes')
      .then(
        rest => this.clientes = rest
      )
    this.servicegeral.getAllsampledto('grupofinanceirocontrato')
      .then(
        rest => this.grupoFinanceiro = rest
      )
    this.validateForm = this.fb.group({
      cliente: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      grupoFinanceiro: [null, [Validators.required]],
      periodo: [null, [Validators.required]],
    });
  }
  getLista() {
    console.log('1')
    //  this.mainAtiviadade.pagesample(this.controller, this.value, this.page - 1);
    this.servicegeral.getAnyPage(this.controller + '/page/all', this.value, this.page - 1)
      .then(
        (response) => {
          console.log(response);

          this.pages = response;
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )
  }

  showModal(): void {
    this.obj = { nome: '', grupoFinanceiro: {} as BaseDto, cliente: {} as SampleDto, periodo: 0 } as ContratoDto;
    this.isVisible = true;
  }
}
