import { CurrencyMaskInputMode } from 'ngx-currency';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UtilsService } from 'src/services/utils.service';
import { SeviceGeralService } from './../../../../../../services/sevice-geral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAnuncioProduto } from './../../base-anuncio-produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-anuncio-loja',
  templateUrl: './edit-anuncio-loja.component.html',
  styleUrls: ['./edit-anuncio-loja.component.css']
})
export class EditAnuncioLojaComponent extends BaseAnuncioProduto implements OnInit {
  customIntMaskConfig = {
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


  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 6,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  constructor(
  public activatedRoute: ActivatedRoute,
  public router: Router,
  public fb: FormBuilder,
  public servicegeral: SeviceGeralService,
  public utilservice: UtilsService,
  public message: NzMessageService,
  private modalService1: NzModalService,
) {
  super(router,fb, servicegeral, 'anunciosloja', activatedRoute, utilservice);}
  ngOnInit(): void {
    this.controller = 'anunciosloja';
    super.ngOnInit();
  }

}
