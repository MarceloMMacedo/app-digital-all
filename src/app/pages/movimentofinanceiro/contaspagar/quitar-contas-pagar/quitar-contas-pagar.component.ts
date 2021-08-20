import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { ContasPagar } from 'src/models/movimento/contas-pagar';
import { SampleDto } from './../../../../../models/sample-dto';
import { UtilsService } from './../../../../../services/utils.service';
import { NewObjectService } from './../../../../../services/new-object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FaturaPagar } from 'src/models/movimento/fatura-pagar';

@Component({
  selector: 'app-quitar-contas-pagar',
  templateUrl: './quitar-contas-pagar.component.html',
  styleUrls: ['./quitar-contas-pagar.component.css']
})
export class QuitarContasPagarComponent implements OnInit {
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


  customMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  listcontaspagadtos: ContasPagar[];
  contaspagar: FaturaPagar;
  isVisible = false;
  validateForm!: FormGroup;
  validateFormforn!: FormGroup;
  time;
  isrealy: boolean = false;
  current = 0;
  index = 'First-content';
  grupofinanceiros: SampleDto[];
  historicoContaPagar: string[];
  hs;
  load1 = '';
  bancos: SampleDto[];
  historicos: SampleDto[];
  centrocustos: SampleDto[];
  fornecedores: SampleDto[];
  filteredOptions: string[];
  dateFormat = 'dd/MM/yyyy';
  isVisibleforn: boolean = false;
  controller = 'faturacontaspaga';
  uploading = false;
  fileList: NzUploadFile[] = [];
  targetUrl: any;
  return: any;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService,
    private utilservice: UtilsService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    this.return = this.activatedRoute.snapshot.paramMap.get('return');
    this.isrealy = false;
    this.servicegeral.getAllsampledto('bancos')
      .then(
        rest => {
          this.bancos = rest;
          console.log(rest);

        }
      )
    this.servicegeral.getAllsampledto('centrocustos')
      .then(
        rest => {
          this.centrocustos = rest
        }
      )
    this.servicegeral.getAllsampledto('grupocontapagar')
      .then(
        rest => {
          this.grupofinanceiros = rest;

        }
      );
    this.servicegeral.getAllsampledto('fornecedores')
      .then(
        rest => {
          console.log(rest);
          this.fornecedores = rest;
        }
      )
    this.time = setInterval(async () => {
      this.isrealy = false;
      try {
        this.servicegeral.getAny(`${this.controller}/fingiddto/${this.index}`)
          .then(
            rest => {
              this.isrealy = true;
              this.contaspagar = rest;
              this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contaspagar.imagemView);
              console.log(rest);
              if (this.time) {
                clearInterval(this.time);
              }
            }
          )
      } catch (error) {

      }
    }, 500);
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
    this.servicegeral.uploadfile(this.controller, this.index, formData)
      .then(

        (rest) => {
          //console.log(rest);
          this.contaspagar.imagemView = rest.body;
          this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contaspagar.imagemView);
          this.uploading = false;
          this.fileList = [];

        }
      )
    this.uploading = true;
  }
  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }

  quitarftura(): void {
    this.servicegeral.putobj(`${this.controller}/quitar/${this.index}`, this.contaspagar)
      .then(
        () => {
          this.servicegeral.createNotification('success', 'Sucesso', 'Lançamento concluido com sucesso');
          this.router.navigate(['contaspagar/'+ this.return]);
        }
      )
  }
}
