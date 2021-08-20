import { CentroCusto } from './../../../../../models/centro-custo';
import { UtilsService } from './../../../../../services/utils.service';
import { GrupoFinanceiroContrato } from 'src/models/grupo-financeiro-contrato';
import { AgregadoGrupoContrato } from './../../../../../models/AgregadoGrupoContrato';
import { SampleDto } from './../../../../../models/sample-dto';
import { NewObjectService } from './../../../../../services/new-object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
@Component({
  selector: 'app-edit-grupo-contrato',
  templateUrl: './edit-grupo-contrato.component.html',
  styleUrls: ['./edit-grupo-contrato.component.css']
})
export class EditGrupoContratoComponent implements OnInit {
  controller = 'grupofinanceirocontrato';
  isrealy: boolean = false;
  index;
  time: any;
  isVisible = false;
  grupofinanceiro: GrupoFinanceiroContrato;
  iseditfornecedores = false;
  validateForm: FormGroup;

  bancos: SampleDto[];
  centrocustos: SampleDto[];
  historico: AgregadoGrupoContrato;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService,
    private utilservice: UtilsService,
    private newobject: NewObjectService) { }

  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
    this.time = setInterval(() => {
      console.log(i++);
      this.isrealy = false;
      try {
        this.load();
      } catch (error) {

      }
    }, 500);

    this.validateForm = this.fb.group({
      nome: [null, [Validators.required]],
    });


  }
  load() {
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.grupofinanceiro = response;
          if (this.time) {
            clearInterval(this.time);
          }

          // if (this.grupofinanceiro.banco == null) this.grupofinanceiro.banco.id = 0;
          //console.log(response);

          this.isrealy = true;

        },
        (error) => { }
      );
    try {
      this.servicegeral.getAllsampledto('bancos')
        .then(
          rest => {
            this.bancos = rest;
          }
        )
      this.servicegeral.getAllsampledto('centrocustos')
        .then(
          rest => {
            this.centrocustos = rest
          }
        )
    } catch (error) {

    }
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
    //console.log(this.grupofinanceiro);
    let issave: boolean = true;
    if (this.grupofinanceiro.banco.id == null) {
      this.utilservice.createNotification('error', 'Selecione um Banco para faturas', 'erro de inconsistencia de informação');
      issave = false;
      return;

    }
    this.grupofinanceiro.agregados.forEach(e => {
      if (e.centroCusto.id == null) {
        this.utilservice.createNotification('error', 'Selecione um Centro de Custo para Agregado', 'erro de inconsistencia de informação');
        issave = false;
        return;
      }
    });
    if (issave) {
      this.servicegeral.saveobj(this.controller, this.grupofinanceiro, this.index)
        .then(
          rest => {

            this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso');
            this.servicegeral.fingbyid(this.controller, this.index)
              .then(
                (response) => {
                  this.grupofinanceiro = response;
                  //console.log(response);

                  this.isrealy = true;

                },
                (error) => { }
              );
          }
        )
    }

  }
  handleOk(): void {
    this.onsave();
    this.isVisible = false;

  }

  handleCancel(): void {
    this.isVisible = false;
  }
  novohistorico(): void {

    this.historico = this.newobject.agregadocontrato;
    this.grupofinanceiro.agregados.push({
      centroCusto: {} as CentroCusto,
      percentual: 0,
      nome: '',
    });
  }
  edithistorico(event): void {
    this.historico = event;
    this.isVisible = true;
  }
  excliragregado(id) {
    this.grupofinanceiro.agregados.splice(id, 1);
    this.onsave();
  }

  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }

}


