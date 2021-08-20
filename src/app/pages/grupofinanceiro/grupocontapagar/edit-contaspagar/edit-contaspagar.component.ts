import { HistoricoContaPagar } from './../../../../../models/historico-conta-pagar';
import { GrupoContasPagar } from './../../../../../models/grupo-contas-pagar';
import { NewObjectService } from './../../../../../services/new-object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-contaspagar',
  templateUrl: './edit-contaspagar.component.html',
  styleUrls: ['./edit-contaspagar.component.css'],
  styles: [
    `app-prin-contrato {
      /* hide the printing component from @media screen  */
      display: none;
   }

   @media print {
      /* invert the display (show/hide) properties of the main */
      /* aplication component and the printing component       */
      app-prin-contrato {
          display: block;
      }
       .pagina{
          display: none;
      }
   }
    `
  ]
})
export class EditContaspagarComponent implements OnInit {
  controller = 'grupocontapagar';
  isrealy: boolean = false;
  index;
  isVisible = false;
  grupofinanceiro: GrupoContasPagar;
  iseditfornecedores = false;
  validateForm: FormGroup;
  historico: HistoricoContaPagar;
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
          this.grupofinanceiro = response;
          console.log(response);

          this.isrealy = true;

        },
        (error) => { }
      );
    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
    });


  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
     return this.validateForm.controls[control].hasError(error);
  }
  submitForm(): void {
    /*for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    */
  }
  onsave(): void {
    console.log(this.grupofinanceiro);
    this.servicegeral.saveobj(this.controller, this.grupofinanceiro, this.index)
      .then(
        rest => {

          this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso');
          this.servicegeral.fingbyid(this.controller, this.index)
          .then(
            (response) => {
              this.grupofinanceiro = response;
              console.log(response);

              this.isrealy = true;

            },
            (error) => { }
          );
        }
      )

  }
  handleOk(): void {
    this.onsave();
    this.isVisible = false;

  }

  handleCancel(): void {
    this.isVisible = false;
  }
  novohistorico(): void {

    this.historico = this.newobject.historicocontasapagar;
    this.grupofinanceiro.historicos.push(this.historico);
    this.isVisible = true;
  }
  edithistorico(event): void {
    this.historico = event;
    this.isVisible = true;
  }
  showConfirm(): void {



  }


}


