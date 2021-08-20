import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { Banco } from './../../../../../models/banco';

import { Pages } from './../../../../../models/pages';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-list-banco',
  templateUrl: './list-banco.component.html',
  styleUrls: ['./list-banco.component.css']
})
export class ListBancoComponent implements OnInit {
  pages: Pages = {} as Pages;
  value: string = '';
  page: any = 1;
  last: boolean;
  isrealy: boolean = false;
  controller = 'bancos';
  validateForm!: FormGroup;
  isVisible = false;
  /*nome: string;
  email: string;
  cnpj: string;
  length = 100;
  */
  banco:Banco;
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
      banco: [null, [Validators.required]],
      saldo: [null, [Validators.required]],
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
    this.servicegeral.findallpage(this.controller, this.value, this.page - 1)
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
     this.banco={nome:'',banco:'',saldo:0} as Banco;
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

    this.servicegeral.newobj(this.controller, this.banco)
      .then(
        (response) => {
          console.log(response.body);
           this.router.navigate(['bancos/', response.body]);
        },
        (error) => {
          console.log(error);

        }
      )

  }


}
