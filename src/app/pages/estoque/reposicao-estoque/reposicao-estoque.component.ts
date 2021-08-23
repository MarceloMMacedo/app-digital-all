import { Banco } from './../../../../models/banco';
import { Router } from '@angular/router';
import { ItensReposicaoDto, RessuprimentoDto } from './../../../../models/estoque/ressuprimento-dto';
import { SampleDto } from './../../../../models/sample-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { Component, OnInit } from '@angular/core';
import { routes } from '@nebular/auth';
import { CotacaoDto } from 'src/models/estoque/cotacao-dto';
import { ItensCotacao } from 'src/models/estoque/itens-cotacao';

@Component({
  selector: 'app-reposicao-estoque',
  templateUrl: './reposicao-estoque.component.html',
  styleUrls: ['./reposicao-estoque.component.css']
})
export class ReposicaoEstoqueComponent implements OnInit {
  reposicao: RessuprimentoDto;
  empresa;
  isrealy;
  fornecedores: SampleDto[];
  validateForm!: FormGroup;
  isVisible = false;
  checked = false;
  indeterminate = false;
  cotacaoDto: CotacaoDto;
  totalloja = 0
  totalweb = 0;
  totalcontrato = 0;
  total = 0;
  itensAnuncioContrato: ItensCotacao[] = [] as ItensCotacao[];
  itensAnuncioLoja: ItensCotacao[] = [] as ItensCotacao[];
  itensAnuncioWeb: ItensCotacao[] = [] as ItensCotacao[];

  itensressuprimento: ItensCotacao[] = [] as ItensCotacao[];

  constructor(
    private servicegeral: SeviceGeralService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isrealy = false;
    this.servicegeral.getAll('empresas')
      .then(
        (rest) => {
          this.empresa = rest
        }
      )

    this.servicegeral.getAllsampledto('fornecedores')
      .then(
        (rest) => {
          this.fornecedores = rest;
        }

      )
    this.servicegeral.getAny('reposicaoestoque')
      .then(
        rest => {
          this.reposicao = rest;
          console.log(rest);

          this.isrealy = true;
        }
      )
    this.validateForm = this.fb.group({
      fornecedor: [null, [Validators.required]],

    })
  }


  /*operacao*/
  novacotacao(): void {

    this.cotacaoDto = {
      itensCotacaos: [],
      fornecedor: {},
      dataAbertura: new Date(),
      status: 'Aberto',
    } as CotacaoDto;


console.log(this.cotacaoDto);

    this.isVisible = true;

  }
  handleOk(): void {
    this.isVisible = false;
   this.cotacaoDto.itensCotacaos=this.itensressuprimento;
    console.log(this.cotacaoDto);
    this.servicegeral.newobj(`cotacoes`, this.cotacaoDto)
    .then(
      rest => {
        this.router.navigate(['estoque/cotacoes/edit-cotacao/', rest.body]);
      }
    );
    /*this.servicegeral.newobj(`cotacoes`, this.cotacaoDto)
      .then(
        rest => {
          this.cotacaoDto.id=rest.body;
           this.itensressuprimento.forEach(el => {
            const c11:ItensCotacao = el;
            console.log(el.descricao);
            this.cotacaoDto.itensCotacaos.push(c11);
          });
          this.cotacaoDto.id=rest.body;
          this.cotacaoDto.itensCotacaos=this.itensressuprimento;
          let item:ItensCotacao ={
            anuncio:1,
            descricao:'sdfasd'
          }
         this.servicegeral.saveobj(`cotacoes`,this.cotacaoDto,rest.body )
          .then(
            (rest)=>{
              console.log(this.cotacaoDto);

            }
          )
        //  this.router.navigate(['estoque/cotacoes/', rest]);
        }
      )*/
    console.log(this.cotacaoDto);

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
  ngOnChangesitensLoja(event): void {


    this.itensAnuncioLoja = [] as ItensCotacao[];
    event.forEach(el => {
      this.itensAnuncioLoja.push(el);
    });
    this.ngOnChangesitenstotal();
  }
  ngOnChangesitensWeb(event): void {

    this.itensAnuncioWeb = [] as ItensCotacao[];
    event.forEach(el => {
      this.itensAnuncioWeb.push(el);
    });

    this.ngOnChangesitenstotal();
  }
  ngOnChangesitensContrato(event): void {

    this.itensAnuncioContrato = [] as ItensCotacao[];
    event.forEach(el => {
      this.itensAnuncioContrato.push(el);
    });

    this.ngOnChangesitenstotal();
  }
  ngOnChangesitenstotal(): void {
    this.itensressuprimento = [] as ItensCotacao[];

    this.itensAnuncioContrato.forEach(el => {

      this.itensressuprimento.push(el);
      console.log(el);

    });
    this.itensAnuncioLoja.forEach(el => {
      console.log(el);
      this.itensressuprimento.push(el); console.log(el);

    });
    this.itensAnuncioWeb.forEach(el => {
      this.itensressuprimento.push(el);
    });
    /*this.itensressuprimento.push(this.inputRessuprimentoDto.itensAnuncioContrato); console.log(this.itensressuprimento);
    this.itensressuprimento.push(this.inputRessuprimentoDto.itensAnuncioLoja); console.log(this.itensressuprimento);
    this.itensressuprimento.push(this.inputRessuprimentoDto.itensAnuncioWeb); console.log(this.itensressuprimento);
    */console.log(this.itensressuprimento);
  }

  ngOnChangesLoja(event): void {
    this.totalloja = event;
    this.ngOnChangestotal();
  }
  ngOnChangesWeb(event): void {
    this.totalweb = event;
    this.ngOnChangestotal();
  }
  ngOnChangesContrato(event): void {
    this.totalcontrato = event;
    this.ngOnChangestotal();
  }



  ngOnChangestotal(): void {
    this.total = 0;
    this.total = this.totalloja + this.totalweb + this.totalcontrato;
  }
}
