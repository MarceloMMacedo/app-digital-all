import { AnuncioDto } from './../../../../../models/anuncio-dto';
import { SampleDto } from './../../../../../models/sample-dto';
import { ListGenericClass } from 'src/app/pages/genericclasses/list-generic-class';
import { Router } from '@angular/router';
import { SeviceGeralService } from '../../../../../services/sevice-geral.service';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mao-obra',
  templateUrl: './lista-mao-obra.component.html',
  styleUrls: ['./lista-mao-obra.component.css']
})
export class ListaMaoObraComponent extends ListGenericClass implements OnInit {


  isVisibleedit = false;
  grupofinanceiros: SampleDto[];
  anuncioDto: AnuncioDto;
  validateForm!: FormGroup;
  produtos: SampleDto[];
  grupofinanceiro: SampleDto;
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'anuncioservicos', 'estoque/anuncios/anunciosloja/');

  }

  ngOnInit(): void {
    this.servicegeral.getAllsampledto('grupofinanceiroanuncio')
      .then(
        rest => {
          this.grupofinanceiros = rest;
          console.log(rest);
        })
    super.ngOnInit();
    this.validateForm = this.fb.group({
      valor: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      categoria: [null, [Validators.required]]
    });
  }

  showModal(): void {
    this.anuncioDto = {} as AnuncioDto;
    this.anuncioDto.grupopreco={} as SampleDto;
    console.log( this.anuncioDto);
    // this.pessoa = { nome: '', cnpj: '', email: '' } as Pessoa;
    this.isVisible = true;
  }
  editanucio(id) {
    this.servicegeral.getAny(`${this.controller}/anuncio/${id}`)
      .then(
        (response) => {
          this.anuncioDto = response;
          this.isVisibleedit = true;
        })

  }

  handleOk(): void {

    this.showConfirm();
  }
  showConfirm(): void {
console.log( this.anuncioDto);

    if (this.isVisibleedit) {
      this.servicegeral.saveobj(this.controller, this.anuncioDto,this.anuncioDto.id)
      .then(
        (response) => {
          this.isVisibleedit = false;
          super.getLista();
        },
        (error) => {
          console.log(error);
        }
      )
    }

    if (this.isVisible) {
      this.servicegeral.newobj(this.controller, this.anuncioDto)
      .then(
        (response) => {
          console.log(response.body);
          this.isVisible = false;
          super.getLista();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

}
