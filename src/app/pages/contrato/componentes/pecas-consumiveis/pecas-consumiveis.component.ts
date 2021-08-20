import { ItemProdutoAnuncio } from './../../../../../models/item-produto-anuncio';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AnuncioContrato } from './../../../../../models/anuncio-contrato';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { AnuncioDto } from './../../../../../models/anuncio-dto';
import { BaseDto } from './../../../../../models/base-dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pecas-consumiveis',
  templateUrl: './pecas-consumiveis.component.html',
  styleUrls: ['./pecas-consumiveis.component.css']
})
export class PecasConsumiveisComponent implements OnInit {
  @Input() anuncio: AnuncioContrato;
  @Input() produtos: BaseDto[];
  @Input() gruposanuncio: BaseDto[];
  @Input() unidades: string[];

  uploading = false;
  fileList: NzUploadFile[] = [];

  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  customIntMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  constructor(
    public servicegeral: SeviceGeralService,) { }

  ngOnInit(): void {
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
    if (this.anuncio.id > 0) {
      this.saveimagem(this.anuncio.id, formData);
    } else {
      this.servicegeral.newobj('anunciocontrato', this.anuncio)
        .then(
          rest => {
            this.anuncio.id = rest;
            this.saveimagem(this.anuncio.id, formData);
          }
        )
    }


    this.uploading = true;
  }

  saveimagem(id, formData: FormData): void {
    this.servicegeral.uploadfile('anunciocontrato', id, formData)
      .then(
        (rest) => {
          this.uploading = false;
          this.anuncio.imagemView = rest.body;
          console.log(rest.body);

          this.fileList = [];
        }
      )
  }
  novoproduto() {
    let i: ItemProdutoAnuncio = {
      produto: {id:0} as BaseDto,
      quantidade: 0,
      valor: 0,
      subtotal: 0,
      descricao: '',
    } as ItemProdutoAnuncio;
    this.anuncio.itensProduto.push(i);
  }
  removeproduto(i){
    this.anuncio.itensProduto.splice(i,1)
  }
}
