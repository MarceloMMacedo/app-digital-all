import { CotacaoDto } from './../../../../models/estoque/cotacao-dto';
import { ItensReposicaoDto, RessuprimentoDto } from './../../../../models/estoque/ressuprimento-dto';
import { SampleDto } from './../../../../models/sample-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { Component, OnInit } from '@angular/core';

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
  inputRessuprimentoDto: RessuprimentoDto = {};
  itensressuprimento: ItensReposicaoDto[] = [];

  constructor(
    private servicegeral: SeviceGeralService,
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
    this.cotacaoDto = {} as CotacaoDto;
    this.cotacaoDto.fornecedor = { id: 0 } as SampleDto;
    this.cotacaoDto.itensCotacaos = this.itensressuprimento;
    this.isVisible = true;

  }
  handleOk(): void {
    this.isVisible = false;
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
    console.log(event);

    this.inputRessuprimentoDto.itensAnuncioLoja = [];
    this.inputRessuprimentoDto.itensAnuncioLoja = event;
    this.ngOnChangesitenstotal();
  }
  ngOnChangesitensWeb(event): void {
    this.inputRessuprimentoDto.itensAnuncioWeb = [];
    this.inputRessuprimentoDto.itensAnuncioWeb = event;
    this.ngOnChangesitenstotal();
  }
  ngOnChangesitensContrato(event): void {
    this.inputRessuprimentoDto.itensAnuncioContrato = [];
    this.inputRessuprimentoDto.itensAnuncioContrato = event;
    this.ngOnChangesitenstotal();
  }
  ngOnChangesitenstotal(): void {
    this.itensressuprimento = [];
    this.itensressuprimento.push(...this.inputRessuprimentoDto.itensAnuncioContrato);
    this.itensressuprimento.push(...this.inputRessuprimentoDto.itensAnuncioLoja);
    this.itensressuprimento.push(...this.inputRessuprimentoDto.itensAnuncioWeb);
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
