import { EditGeneric } from './../../genericclasses/edit-generic';
import { Patrimonio } from 'src/models/patrimonio';
import { RemocaoPatrimonio } from './../../../../models/remocao-patrimonio';
 import { Medidor } from './../../../../models/medidor';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SampleDto } from './../../../../models/sample-dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { UtilsService } from 'src/services/utils.service';

@Component({
  selector: 'app-edit-parimonio',
  templateUrl: './edit-parimonio.component.html',
  styleUrls: ['./edit-parimonio.component.css']
})
export class EditParimonioComponent extends EditGeneric implements OnInit {
  uploading = false;
  fileList: NzUploadFile[] = [];
  remocao: RemocaoPatrimonio;
  patrimoniostombados:Patrimonio
  isVisible = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
    private modalService1: NzModalService,
  ) {
    super(router, servicegeral, 'patrimonios', activatedRoute, utilservice);
  }


  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
    this.time = setInterval(async () => {
      console.log(i++);
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
          this.obj = response;
          console.log(this.obj);
          this.servicegeral._obj = response;
          if (this.obj.status == 'Inativo') {
            this.isreadonly = true;
          }
          if (this.time) {
            clearInterval(this.time);
          }

          this.isrealy = true;

        },
        (error) => { }
      );

  }
  showConfirm(): void {
    console.log(this.obj.modelo.nome);

    this.modalService1.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje Salvar patrimonio',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let m: SampleDto = {} as SampleDto;
        m.nome = this.obj.modelo.nome;
        this.servicegeral.findbynome('modelos', m.nome)
          .then(
            rest => {
              if (rest != null) {
                this.obj.modelo = rest;
                super.onsave();

              } else {
                this.modalService1.confirm({
                  nzTitle: 'Confirm',
                  nzContent: 'Modelo inexistente Deseja Adicionar o modelo: ' + this.obj.modelo.nome + ' ?',
                  nzOkText: 'OK',
                  nzCancelText: 'Cancel',
                  nzOnOk: () => {
                    this.addmodelo(m, this.obj);
                  },
                  nzOnCancel: () => {
                    return;
                  }
                }
                );
              }
            })
        console.log(this.obj);
      }
    });
  }
  addmodelo(m: SampleDto, p) {
    this.servicegeral.newobj('modelos', m)
      .then(
        (response) => {
          m.id = (response.body);
          p.modelo = m;
          super.onsave();
        },
        (error) => {
          console.log(error);
        }
      )
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  savaImagem(event): void {
    const foto = event.target.files[0];
    const formData = new FormData();
    formData.set('file', foto);
  }
  handleUpload(): void {
    let formData = new FormData();
    // tslint:disable-next-line:no-any
    //console.log(this.fileList);

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      console.log(formData);

    });
    this.servicegeral.uploadfile(this.controller, this.index, formData)
      .then(
        (rest) => {
          super.load();
          this.uploading = false;
          this.fileList = [];
        }
      )
    this.uploading = true;
  }

  baixarpatrimonio() {

    this.remocao = {} as RemocaoPatrimonio;
    this.remocao.medidorRemocao = {} as Medidor;
    this.isVisible = true;
  }
  setRemocaoPatrimonio(event) {
    this.obj.remocaoPatrimonio = event;

    this.obj.status = 'Inativo';
     this.onsave();
     super.ngOnInit();
     this.isVisible =false;
  }
}
