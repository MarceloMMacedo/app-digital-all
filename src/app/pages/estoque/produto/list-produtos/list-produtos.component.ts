import { Produto } from './../../../../../models/estoque/produto';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { ListGenericClass } from './../../../genericclasses/list-generic-class';

import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { SampleDto } from 'src/models/sample-dto';

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.css']
})
export class ListProdutosComponent extends ListGenericClass implements OnInit {



  controller = 'produtos';

  modelos: string[];
  inputmodelo?: string;
  filteredOptions: string[] = [];

  categoria = '';
  unidade = '';
  categorias: [];
  unidades: [];


  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'produtos', 'estoque/edit-produtos/');
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
    //unidades
    this.servicegeral.getlistageral('produtos', 'listaunidade')
      .then(
        rest => {
          this.unidades = rest;
        }
      )
    //categoria
    this.servicegeral.getlistageral('produtos', 'listacategoriaproduto')
      .then(
        rest => {
          this.categorias = rest;
        }
      )
    this.validateForm = this.fb.group({
      produto: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      unidade: [null, [Validators.required]],
      remember: [true]
    });

  }




  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir Produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let p: Produto = {} as Produto;
        p.nome = this.obj;
        p.categoria = this.categoria;
        p.unidade = this.unidade;
        let m: SampleDto = {} as SampleDto;
        m.nome = this.inputmodelo;
        this.servicegeral.findbynome('modelos', this.inputmodelo)
          .then(
            rest => {
              if (rest != null) {
                m = rest;
                p.modelo = m;
                this.addproduto(p);
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
  addproduto(p) {
    this.servicegeral.newobj(this.controller, p)
      .then(
        (response) => {
          console.log(response.body);
          this.router.navigate(['digital/edit-produtos', response.body]);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  addmodelo(m: SampleDto, p) {
    this.servicegeral.newobj('modelos', m)
      .then(
        (response) => {
          m.id = (response.body);
          p.modelo = m;
          this.addproduto(p);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  onChange(value: string): void {
    this.filteredOptions = this.modelos.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    this.obj = '';
    this.obj = this.categoria + ' ' + this.obj + ' ' + value;
  }
  categoriaChange(value: string): void {
    this.obj = '';
    this.obj = value + ' ' + this.obj + ' ' + this.inputmodelo;
  }


}
 //lista

