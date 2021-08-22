import { OneColumnLayoutComponent } from './../../../layout/ngx-one-column-layout/one-column.layout';
import { ItensReposicaoDto } from './../../../../models/estoque/ressuprimento-dto';
import { SampleDto } from './../../../../models/sample-dto';
import { Pessoa } from './../../../../models/pessoa';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { RessuprimentoDto } from '../../../../models/estoque/ressuprimento-dto';
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

  totalloja = 0
  totalweb = 0;
  totalcontrato = 0;
  total = 0;



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
  ngOnChangesLoja(event): void {
    this.totalloja = event;
    this.ngOnChangestotal( );
  }
  ngOnChangesWeb(event): void {
    this.totalweb = event;
    this.ngOnChangestotal( );
  }
  ngOnChangesContrato(event): void {
    this.totalcontrato = event;
    this.ngOnChangestotal( );
  }


  ngOnChangestotal( ): void {
    this.total=0;
    this.total=this.totalloja+this.totalweb+this.totalcontrato;
 }
}
