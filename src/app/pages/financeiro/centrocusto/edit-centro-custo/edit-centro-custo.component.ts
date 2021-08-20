import { CentroCusto } from './../../../../../models/centro-custo';
import { NewObjectService } from './../../../../../services/new-object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-centro-custo',
  templateUrl: './edit-centro-custo.component.html',
  styleUrls: ['./edit-centro-custo.component.css']
})
export class EditCentroCustoComponent implements OnInit {
  controller = 'centrocustos';
  isrealy: boolean = false;
  index;
  isVisible = false;
  centroCusto: CentroCusto;
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
          this.centroCusto = response;
          console.log(response);

          this.isrealy = true;

        },
        (error) => { }
      );
       this.validateForm = this.fb.group({
        nome: [null, [Validators.required]],
        CentroCusto: [null, [Validators.required]],
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
    console.log(this.centroCusto);
    this.servicegeral.saveobj(this.controller, this.centroCusto, this.index)
      .then(
        rest => {

          this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso')
        }
      )

  }

}
