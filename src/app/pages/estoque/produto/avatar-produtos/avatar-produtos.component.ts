import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../../../../../services/utils.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { SeviceGeralService } from '../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Produto } from '../../../../../models/produto';
import { Component, Input, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-avatar-produtos',
  templateUrl: './avatar-produtos.component.html',
  styleUrls: ['./avatar-produtos.component.css']
})
export class AvatarProdutosComponent implements OnInit {

  @Input() produto: Produto;
  controller = 'produtos';
  uploading = false;
  fileList: NzUploadFile[] = [];
  targetUrl: any;
  return: any;
  constructor(
    private modal: NzModalService,
    private servicegeral: SeviceGeralService,
    private utilservice: UtilsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  handleUpload(): void {

    let formData = new FormData();
    // tslint:disable-next-line:no-any
    //console.log(this.fileList);

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      //console.log(formData);

    });
    this.servicegeral.uploadfile(this.controller, this.produto.id, formData)
      .then(

        (rest) => {
          //console.log(rest);
          this.produto.imagemView = rest;//this.sanitizer.bypassSecurityTrustResourceUrl(this.produto.imagemView);
          this.uploading = false;
          this.fileList = [];

        }
      )
    this.uploading = true;
  }
}
