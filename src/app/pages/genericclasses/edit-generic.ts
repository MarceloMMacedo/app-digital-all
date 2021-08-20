import { UtilsService } from './../../../services/utils.service';
import { FormGroup } from '@angular/forms';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SeviceGeralService } from 'src/services/sevice-geral.service';


@Component({
  template: ''
})
export class EditGeneric implements OnInit {

  modalService: NzModalService;
  router: Router;
  isreadonly: boolean = false;
  nzMessage: NzMessageServiceModule;
  activatedRoute: ActivatedRoute;
  servicegeral: SeviceGeralService;
  utilservice:UtilsService;
  time: any;
  obj: any;
  controller;
  index;
  isrealy;
  validateForm!: FormGroup;
  constructor(
    _router: Router,
    _servicegeral: SeviceGeralService,
    _controller: String,
    _activatedRoute: ActivatedRoute,
    _utilservice:UtilsService
    ) {
    this.router = _router;
    this.servicegeral = _servicegeral;
    this.controller = _controller
    this.obj = _servicegeral._obj;
    this.activatedRoute=_activatedRoute;
    this.utilservice=_utilservice;
  }
  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
     this.load();
    this.time = setInterval(async () => {
     // console.log(i++);
      this.isrealy = false;
      try {
      await  this.load();
      } catch (error) {

      }
    }, 500);
  }
  async load() {
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.isrealy = true;
          this.obj = response;
          console.log(this.obj);

          if (this.time) {
            clearInterval(this.time);
          }

          this.isrealy = true;

        },
        (error) => { }
      );

  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.validateForm.controls[control].hasError(error);
  }

  onsave(): void {
    //console.log(this.obj);
 {
      this.servicegeral.saveobj(this.controller, this.obj, this.index)
        .then(
          rest => {

            this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso');
           /* this.servicegeral.fingbyid(this.controller, this.index)
              .then(
                (response) => {
                  this.obj = response;
                  //console.log(response);

                  this.isrealy = true;

                },
                (error) => { }
              );*/
              this.load();
          }
        )
    }

  }
  handleOk(): void {
    this.onsave();


  }

  handleCancel(): void {
  }


  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
