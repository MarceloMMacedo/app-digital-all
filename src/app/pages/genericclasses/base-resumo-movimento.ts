import { ContaReceber } from './../../../models/movimento/contasreceber/conta-receber';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { SampleDto } from './../../../models/sample-dto';
import { Empresa } from './../../../models/empresa';
import { FormGroup } from '@angular/forms';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SeviceGeralService } from 'src/services/sevice-geral.service';


@Component({
  template: ''
})
export class BaseResumoMovimento implements OnInit {

  value: string = '';
  page: any = 1;
  last: boolean;
  isrealy: boolean = false;
  controllerAberto;
  controllerQuit;
  validateForm!: FormGroup;
  isVisible = false;
  modalService: NzModalService;
  router: Router;
  nzMessage: NzMessageServiceModule
  servicegeral: SeviceGeralService;
  time: any;
  objAberto: ContaReceber;
  objQuit: ContaReceber;
  datainicio: any;
  datafim: any;
  redirectedit;
  clientes: SampleDto[];
  cliente: SampleDto;
  bancos: SampleDto[];
  centrocustos: SampleDto[];

  dateFormat = 'dd/MM/yyyy';

  empresa: Empresa;
  isloadaberto = false;
  isloadquit = false;
  constructor(_modalService: NzModalService,
    _router: Router,
    _nzMessage: NzMessageServiceModule,
    _servicegeral: SeviceGeralService,
    _controller: String,
    _redirectedit: String,
  ) {

    this.modalService = _modalService;
    this.router = _router;
    this.nzMessage = _nzMessage;
    this.servicegeral = _servicegeral;
    this.redirectedit = _redirectedit;
  }

  ngOnInit(): void {
    this.isrealy = false;
console.log(1);

    this.servicegeral.getAll('empresas')
      .then(
        (rest) => {
          this.empresa = rest;
        //  console.log(rest);

        }
      )
    this.servicegeral.getAllsampledto('bancos')
      .then(
        rest => {
          this.bancos = rest;
          //console.log(rest);

        }
      )
    this.servicegeral.getAllsampledto('centrocustos')
      .then(
        rest => {
          this.centrocustos = rest
        }
      )

    this.servicegeral.getAllsampledto('clientes')
      .then(
        rest => {
          this.clientes = rest;
          this.cliente = this.clientes[0];
        }
      )

  }

  onLoad() {
  //  this.controllerAberto=`contasreceber/contasreceberaberto?inicio=${this.datainicio}&fim=${this.datafim}`;
  //  this.controllerQuit=`contasreceber/contasreceberquit?inicio=${this.datainicio}&fim=${this.datafim}`
 // console.log(this.controllerQuit);
  //console.log(this.controllerAberto);


    let i = 0;
    this.time = setInterval( () => {
      this.isrealy = false;
      try {
        this.servicegeral.getAny(this.controllerAberto)
      .then(
        (rest) => {
          this.objAberto = rest;

          console.log(rest);
          this.isloadquit = true;
        },
        (error) => {

        }
      )
      this.servicegeral.getAny(this.controllerQuit)
      .then(
        (rest) => {
          this.objQuit = rest;
          this.isloadquit = true;
        },
        (error) => {

        }
      )
      this.servicegeral.getAnyObservable(this.controllerAberto)
        .pipe(
          map((x: ContaReceber) => {
            console.log(x);
            this.isrealy = true;
            return this.objAberto=x;
             return x;
          }),
        );;

     //     this.onLoadAberto();

      //  if (this.isloadaberto === true && this.isloadquit === true)
       {
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }
        }

      } catch (error) {

      }
    }, 500);
  }
  onLoadQuit(): Observable<ContaReceber> {

    return this.servicegeral.getAnyObservable(this.controllerQuit)
    .pipe(
      map((x: ContaReceber) => {
        return x;
      }),
    );


  /*  this.servicegeral.getAny(this.controllerQuit)
      .then(
        (rest) => {
          this.objQuit = rest;
          this.isloadquit = true;
        },
        (error) => {

        }
      )
      */
  }
  onLoadAberto(): void {
    this.servicegeral.getAny(this.controllerAberto)
      .then(
        (rest) => {
          this.objAberto = rest;
          console.log(rest);
          this.isloadaberto = true;
        },
        (error) => {

        }
      )
  }

  onRedirect(id) {
    this.router.navigate([this.redirectedit, id]);
  }

  ngOnDestroy(): void {
    if (this.time) {
      clearInterval(this.time);
    }
  }
  handleCancelforn(): void {
    this.isVisible = false;
  }
  showModal() {
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = false;
  }
  print() {
    let printContents = document.getElementById('componentID').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }

  printrecibo() {
    let printContents = document.getElementById('componentRecibo').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }
}
