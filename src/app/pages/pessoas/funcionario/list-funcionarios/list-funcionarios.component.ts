import { Pessoa } from './../../../../../models/pessoa';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { Pages } from './../../../../../models/pages';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.component.html',
  styleUrls: ['./list-funcionarios.component.css']
})
export class ListFuncionariosComponent implements OnInit {
  pages: Pages = {} as Pages;
  value: string = '';
  page: any = 1;
  last: boolean;
  isrealy: boolean = false;
  controller = 'funcionarios';
  validateForm!: FormGroup;
  isVisible = false;
  /*nome: string;
  email: string;
  cnpj: string;
  length = 100;
  */
  pessoa:Pessoa;
  isConfirmLoading = false;

  private subject: Subject<string> = new Subject();
  private destroy$ = new Subject();
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private router: Router,
    private nzMessage: NzMessageServiceModule,
    private servicegeral: SeviceGeralService) { }

  ngOnInit(): void {
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
      ;
    });
    this.getLista();
    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
    });
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.validateForm.controls[control].hasError(error);
  }
  onKeyUp(event) {

    this.subject.next(event.target.value);
    //  this.compararfrase();
  }
  getLista() {
    console.log('1')
    //  this.mainAtiviadade.pagesample(this.controller, this.value, this.page - 1);
    this.servicegeral.getallpagesampledto(this.controller, this.value, this.page - 1)
      .then(
        (response) => {
          console.log(response);

          this.pages = response;
          this.isrealy = true;

        }
      )
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  changepage() {
    console.log(this.page);

    this.getLista();
  }

  showModal(): void {
     this.pessoa={nome:'',cnpj:'',email:''} as Pessoa;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.showConfirm();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(): void {

    this.servicegeral.newobj(this.controller, this.pessoa)
      .then(
        (response) => {
          console.log(response.body);
          this.router.navigate(['/funcionarios/', response.body]);
        },
        (error) => {
          console.log(error);

        }
      )

  }

  opdatecnpj(): void {
    this.servicegeral.getcnpj(this.controller, 0, this.pessoa.cnpj)
      .then(
        rest => {
         this.pessoa=rest;
        }
      )
  }
}
