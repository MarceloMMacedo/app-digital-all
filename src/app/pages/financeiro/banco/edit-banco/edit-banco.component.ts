import { NewObjectService } from './../../../../../services/new-object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Banco } from './../../../../../models/banco';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-banco',
  templateUrl: './edit-banco.component.html',
  styleUrls: ['./edit-banco.component.css']
})
export class EditBancoComponent implements OnInit {
  controller = 'bancos';
  isrealy: boolean = false;
  index;
  isVisible = false;
  banco: Banco;
  iseditfornecedores = false;
  validateForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService,
    private newobject: NewObjectService) { }

  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.banco = response;
          console.log(response);

          this.isrealy = true;

        },
        (error) => { }
      );
       this.validateForm = this.fb.group({
        nome: [null, [Validators.required]],
        banco: [null, [Validators.required]],
        saldo: [null, [Validators.required]],
      });

  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    //return this.validateForm.controls[control].hasError(error);
  }
  submitForm(): void {
    /*for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    */
  }
  onsave(): void {
    console.log(this.banco);
    this.servicegeral.saveobj(this.controller, this.banco, this.index)
      .then(
        rest => {

          this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso')
        }
      )

  }

}
