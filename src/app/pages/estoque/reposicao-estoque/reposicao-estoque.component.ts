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
        }
      )
    this.validateForm = this.fb.group({
      fornecedor: [null, [Validators.required]],

    })
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {

    this.isVisible = false;
  }
  submitForm (): void {
    for (const i in this.validateForm .controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
