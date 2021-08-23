import { CentroCusto } from './../../../../../models/centro-custo';
import { AgregadoGrupoContrato } from './../../../../../models/AgregadoGrupoContrato';
import { SampleDto } from './../../../../../models/sample-dto';

import { UtilsService } from './../../../../../services/utils.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditGeneric } from 'src/app/pages/genericclasses/edit-generic';

@Component({
  selector: 'app-edit-grupo-anuncio',
  templateUrl: './edit-grupo-anuncio.component.html',
  styleUrls: ['./edit-grupo-anuncio.component.css']
})
export class EditGrupoAnuncioComponent extends EditGeneric implements OnInit {
  centrocustos: SampleDto[];
  historico:AgregadoGrupoContrato;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
  ) {
    super(router, servicegeral, 'grupofinanceiroanuncio', activatedRoute, utilservice);
  }


  ngOnInit(): void {
    super.ngOnInit();
    console.log(this.obj);
    this.servicegeral.getAllsampledto('centrocustos')
      .then(
        rest => {
          this.centrocustos = rest
        }
      )
  } catch(error) {

  }
  onsave(): void {
    let issave: boolean = true;

    this.obj.agregadoGrupo.forEach(e => {
      if (e.centroCusto.id == null) {
        this.utilservice.createNotification('error', 'Selecione um Centro de Custo para Agregado', 'erro de inconsistencia de informação');
        issave = false;
        return;
      }
    });
    if (issave) {
      super.onsave();
    }
  }

  novohistorico(): void {
    this.obj.agregadoGrupo.push({
      centroCusto: {} as CentroCusto,
      percentual: 0,
      nome: '',
    });
  }
  edithistorico(event): void {
    this.historico = event;
  }
  excliragregado(id) {
    this.obj.agregadoGrupo.splice(id, 1);
    this.onsave();
  }
}


