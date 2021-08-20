

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Component, OnInit } from '@angular/core';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { Empresa } from 'src/models/empresa';

declare var $: any;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  uploading = false;
  fileList: NzUploadFile[] = [];
  isready: boolean = false;
  empresa: Empresa;
  constructor(
    private serviceGeral: SeviceGeralService,
    private notification: NzNotificationService
  ) { }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  ngOnInit(): void {
    this.isready = false;
    this.empresa = {} as any;

    this.serviceGeral.getAll('empresas')
      .then(
        (rest) => {
          this.empresa = rest
          //console.log(rest);
          this.isready = true;

        }
      )
  }
  savaImagem(event): void {
    const foto = event.target.files[0];
    const formData = new FormData();
    formData.set('file', foto);
    //console.log(foto);

  }
  handleUpload(): void {

    let formData = new FormData();
    // tslint:disable-next-line:no-any
    //console.log(this.fileList);

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      //console.log(formData);

    });
    this.serviceGeral.empresaUpload(formData)
      .then(

        (rest) => {
          //console.log(rest);
          this.empresa.imagemview = rest.body;
          this.uploading = false;
          this.fileList = [];

        }
      )
    this.uploading = true;
  }

  opdatecnpj() {
    let cnpj = this.empresa.cnpj;
    this.serviceGeral.getAll(`empresas/newempresa/${cnpj}`)
      .then(
        (rest) => {
          this.empresa = rest
          console.log(rest);
          this.isready = true;

        }
      )
  }
  saveempresa() {
    console.log(this.empresa);
    this.serviceGeral.putobj('empresas/saveobj', this.empresa)
      .then(
        () => {
          this.notification.create(
            'success',
            'Sucesso',
            'Dados Atualizados com sucesso.'
          );
        }
      )
  }
  updateEmitEmpresa(e: Empresa) {
    this.empresa = e;
  }
}

