import { Pages } from './../../../models/pages';





import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
@Component({
  template: ''
})
export class ListGenericClass implements OnInit {

  pages: Pages = {} as Pages;
  value: string = '';
  page: any = 1;
  last: boolean;
  isrealy: boolean = false;
  controller  ;
  validateForm!: FormGroup;
  isVisible = false;
  modalService: NzModalService;
  router: Router;
  nzMessage: NzMessageServiceModule
  servicegeral: SeviceGeralService;
  time:any;
  obj:any;
  redirectedit;
  /*nome: string;
  email: string;
  cnpj: string;
  length = 100;
  */
  isConfirmLoading = false;

  private subject: Subject<string> = new Subject();
  private destroy$ = new Subject();

  constructor(
    _modalService: NzModalService,
    _router: Router,
    _nzMessage: NzMessageServiceModule,
    _servicegeral: SeviceGeralService,
    _controller: String,
    _redirectedit: String,

    ) {

    this.modalService= _modalService;

    this.router= _router;
    this.nzMessage= _nzMessage;
    this.servicegeral= _servicegeral;
    this.controller=_controller
    this.obj=_servicegeral._obj;
    this.redirectedit=_redirectedit;
  }

  ngOnInit(): void {
    console.log(this.controller);
    this.getLista();
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
      ;
    });
    let i = 1;
    this.time = setInterval(() => {

      this.isrealy = false;
      try {
        this.getLista()
      } catch (error) {

      }
    }, 100);


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
    //  this.mainAtiviadade.pagesample(this.controller, this.value, this.page - 1);
    this.servicegeral.getallpagesampledto(this.controller, this.value, this.page - 1)
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
   // this.pessoa = { nome: '', cnpj: '', email: '' } as Pessoa;
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
console.log(this.obj);

    this.servicegeral.newobj(this.controller, this.obj)
      .then(
        (response) => {
          console.log(response.body);
           this.router.navigate([this.redirectedit, response.body]);
        },
        (error) => {
          console.log(error);

        }
      )


  }


  ngOnDestroy(): void {
    if (this.time) {
      clearInterval(this.time);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
