import { ListGenericClass } from './../../genericclasses/list-generic-class';
import { Pages } from './../../../../models/pages';
import { SampleDto } from './../../../../models/sample-dto';
import { Modelo } from './../../../../models/modelo';
import { Patrimonio } from './../../../../models/patrimonio';
import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-list-parimonio',
  templateUrl: './list-parimonio.component.html',
  styleUrls: ['./list-parimonio.component.css']
})
export class ListParimonioComponent extends ListGenericClass implements OnInit {


  patrimoniostombados:Pages;
  namepartimonio ?: string= '';
  serialpatrimonim?: string;
  codpatrimonio?: string;
  modelos: string[];
  inputmodelo?: string;
  tipopatrimonio: string[];
  tipo?: string;
  filteredOptions: string[] = [];
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'patrimonios', 'patrimonios/');

  }
  ngOnInit(): void {
    super.ngOnInit();
    this.servicegeral.getnomes('modelos')
      .then(
        rest => {
          this.modelos = rest;
          this.filteredOptions = this.modelos;

        }
      )
    this.servicegeral.getAll(this.controller + '/tipopatrimonio')
      .then(
        rest => {
          this.tipopatrimonio = rest;

        }
      )
    this.validateForm = this.fb.group({
      namepartimonio: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      codpatrimonio: [null, [Validators.required]],
      serial: [null, [Validators.required]],
    });
  }

  getLista() {
    this.servicegeral.findallpage(this.controller, this.value, this.page - 1)
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
      this.servicegeral.getAnyPage(this.controller+'/pagetombados', this.value, this.page - 1)
      .then(
        (response) => {

          this.patrimoniostombados = response;
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )
  }

  showConfirm(): void {
    console.log(this.serialpatrimonim);

    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir patrimonio',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let p: Patrimonio = {} as Patrimonio;
        p.nome = this.namepartimonio;

        let m: SampleDto = {} as SampleDto;
        m.nome = this.inputmodelo;
        p.tipo = this.tipo;
        p.serial=this.serialpatrimonim;
        p.codPatrimonio=this.codpatrimonio;
        console.log(p);

        this.servicegeral.findbynome('modelos', this.inputmodelo)
          .then(
            rest => {
              if (rest != null) {
                m = rest;
                p.modelo = m;
                this.addnamepartimonio(p);
              } else {
                this.modalService.confirm({
                  nzTitle: 'Confirm',
                  nzContent: 'Modelo inexistente Deseja Adicionar o modelo: ' + this.inputmodelo + ' ?',
                  nzOkText: 'OK',
                  nzCancelText: 'Cancel',
                  nzOnOk: () => {
                    this.addmodelo(m, p);
                  },
                  nzOnCancel: () => {
                    return;
                  }
                }
                );
              }
            })


        console.log(p);


      }
    });
  }
  addnamepartimonio(p) {
    this.obj=p;
    this.obj.status='Ativo';
   super.showConfirm();
  }
  addmodelo(m: SampleDto, p) {
    this.servicegeral.newobj('modelos', m)
      .then(
        (response) => {
          m.id = (response.body);
          p.modelo = m;
          this.addnamepartimonio(p);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  onChange(value: string): void {
    this.filteredOptions = this.modelos.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    this.namepartimonio = '';
  }
  categoriaChange(value: string): void {
    this.namepartimonio = '';
    this.namepartimonio = value + ' ' + this.namepartimonio + ' ' + this.inputmodelo;
  }

}
