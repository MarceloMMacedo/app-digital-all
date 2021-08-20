import { EditGeneric } from './../../genericclasses/edit-generic';
import { AnuncioContrato } from './../../../../models/anuncio-contrato';
import { ItemProdutoAnuncio } from './../../../../models/item-produto-anuncio';
import { AnuncioDto } from './../../../../models/anuncio-dto';
import { Patrimonio } from './../../../../models/patrimonio';
import { Endereco } from './../../../../models/endereco';
import { Contato } from './../../../../models/contato';
import { Medidor } from './../../../../models/medidor';
import { ItensContratoPatrimonio } from './../../../../models/itens-contrato-patrimonio';
import { Validators, FormBuilder } from '@angular/forms';
import { BaseDto } from './../../../../models/base-dto';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { SeviceGeralService } from './../../../../services/sevice-geral.service';
import { UtilsService } from './../../../../services/utils.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

declare var require: any;

@Component({
  selector: 'app-edit-contrato',
  templateUrl: './edit-contrato.component.html',
  styleUrls: ['./edit-contrato.component.css'],
  styles: [
      `


      `
  ]
})
export class EditContratoComponent extends EditGeneric implements OnInit {
  isVisible = false;
  grupoFinanceiro: BaseDto[];
  clientes: BaseDto[];
  patrimonios: BaseDto[];
  produtos: BaseDto[];
  gruposanuncio: BaseDto[];
  unidades: string[];
  dateFormat = 'dd/MM/yyyy';
  itempatrimonio: ItensContratoPatrimonio;
  isreadonly: boolean = false;
    periodo;
     valor;
    dataforum;
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


  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 6,
    prefix: "R$",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  customCurrencyMaskConfig2 = {
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
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
    private modalService1: NzModalService,
  ) {
    super(router, servicegeral, 'contrato', activatedRoute, utilservice);
  }
  ngOnInit(): void {
    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
     this.load();
    this.time = setInterval(async () => {
     // console.log(i++);
      this.isrealy = false;
      try {
      await  this.load();
      } catch (error) {

      }
    }, 500);
    this.servicegeral.getAllsampledto('clientes')
      .then(
        rest => this.clientes = rest
      )
    this.servicegeral.getAllsampledto('grupofinanceirocontrato')
      .then(
        rest => this.grupoFinanceiro = rest
      )
    this.servicegeral.getAllsampledto(this.controller + '/patrimonios')
      .then(
        rest => this.patrimonios = rest
      )
    this.servicegeral.getAllsampledto('produtos')
      .then(
        rest => this.produtos = rest
      )
    this.servicegeral.getAll(this.controller + '/listaunidade')
      .then(
        rest => this.unidades = rest
      )
    this.servicegeral.getAll('grupofinanceiroanuncio')
      .then(
        rest => this.gruposanuncio = rest
      )
  }

  regerar(): void {

    this.servicegeral.getAll(`faturacontratos/regerarfatura/${this.index}`)
      .then(
        rest => this.load()
      )
  }

  async load() {
    this.servicegeral.getAny(`${this.controller}/contrato/${this.index}`)
      .then(
        (response) => {
          this.obj = response;
          console.log(this.obj);
          this.servicegeral._obj = response;
          const numero = require('numero-por-extenso');
          this.periodo = numero.porExtenso(this.obj.periodo);
          this.valor = numero.porExtenso(this.obj.valorFinal, numero.estilo.monetario);


          let data = new Date();
          var dia = data.getDate();
          var dias = data.getDay();
          var mes = data.getMonth();
          var ano = data.valueOf;



          this.dataforum = new Date();
          if (this.time) {
            clearInterval(this.time);
          }

          this.isrealy = true;

        },
        (error) => { }
      );

  }


  setitem(event, i) {
    this.obj.itenspatrimonio[i] = event;
  }
  onsave(): void {
    let iserro: boolean = false;
    this.obj.itenspatrimonio.forEach(el => {
      if (el.patrimonio.id == null) {
        this.servicegeral.createNotification('error', 'Selecione um patrimonio', 'Erro');
        iserro = true;
        return;
      }
      if (el.nome == null || el.nome == '') {
        this.servicegeral.createNotification('error', 'Selecione um nome para equipamento locado', 'Erro');
        iserro = true;
        return;
      }
    });
    this.obj.anuncioContratos.forEach(el => {
      if (el.grupopreco.id <= 0) {
        this.servicegeral.createNotification('error', 'Selecione um Grupo financeiro para anuncio de produto', 'Erro');
        iserro = true;
        return;
      }

      el.itensProduto.forEach(element => {
        if (element.produto.id <= 0) {
          this.servicegeral.createNotification('error', 'Selecione um Produto para o anúncio do produto locado', 'Erro');
          iserro = true;
          return;
        }
      });
    })
    console.log(this.obj);
    console.log(this.index);


    if (iserro == false) {
      super.onsave();
      this.servicegeral.getAllsampledto(this.controller + '/patrimonios')
        .then(
          rest => this.patrimonios = rest
        )
      /* this.servicegeral.saveobj(this.controller, this.obj, this.obj.id)
         .then(
           rest => {
             this.servicegeral.createNotification('success', 'Dados salvo com sucesso!', 'Sucesso');
             this.servicegeral.fingbyid(this.controller, this.index)
               .then(
                 (response) => {
                   this.obj = response;
                   this.isrealy = true;
                   this.servicegeral.getAllsampledto(this.controller + '/patrimonios')
                     .then(
                       rest => this.patrimonios = rest
                     )
                 },
                 (error) => { }
               );
           }
         );*/

    }

  }
  additem(): void {
    let _contato = {} as Contato;
    if (this.obj.cliente.contato == null) {
      _contato = {
        contato: '',
        emailcontato: '',
        telefonecontato: '',
        setorcontato: '',
      } as Contato
    } else { _contato = this.obj.cliente.contato };
    let endereco = {} as Endereco;

    if (this.obj.cliente.endereco == null) { endereco = {} as Endereco; } else { endereco = this.obj.cliente.endereco };

    let cont = this.obj.itenspatrimonio.length + 1;
    let itempatrimonio: ItensContratoPatrimonio = {
      nome: 'novo equipamento_' + cont,
      patrimonio: { nome: '' },
      valorUnitarioFranquia: 0,
      isFranquado: 'Sim',
      franquia: 0,
      valorFranquia: 0,
      valorPreDeterminado: 0,
      medidorInstalacao: {} as Medidor,
      endereco: endereco,
      contato: _contato,
      valorFinal: 0
    } as ItensContratoPatrimonio;
    this.obj.itenspatrimonio.push(itempatrimonio);
  }
  removeitem(id, i) {
    console.log(i);
    console.log(id);

    if (id > 0) {
      this.servicegeral.excluirbyid(`${this.controller}/deleteitem`, id)
        .then(
          rest => {
            this.servicegeral.createNotification('success', 'item removido com sucesso', 'Sucesso');
            this.servicegeral.getAllsampledto(this.controller + '/patrimonios')
              .then(
                rest => this.patrimonios = rest
              )
          }
        )
    }
    this.obj.itenspatrimonio.splice(i, 1);
    super.onsave();
  }

  //anuncio
  newanuncio(): void {
    // if (this.obj.anuncioContratos == null) { this.obj.anuncioContratos =[] as AnuncioContrato[]  };
    let i: AnuncioContrato = {
      nome: '',
      saldo: 0,
      modelo: { nome: '' } as BaseDto,
      valor: 0,
      imagemView: '',

      grupopreco: { nome: '', id: 0 } as BaseDto,
      unidade: '',
      itensProduto: [] as ItemProdutoAnuncio[]
    } as AnuncioContrato;
    console.log(this.obj.anuncioContratos);

    this.obj.anuncioContratos.push(i);
  }
  removeanuncio(id, i) {
    if (id > 0) {
      this.servicegeral.excluirbyid(`${this.controller}/deleteanuncio`, id)
        .then(
          rest => {
            this.servicegeral.createNotification('success', 'item removido com sucesso', 'Sucesso');
            this.servicegeral.getAllsampledto(this.controller + '/patrimonios')
              .then(
                rest => this.patrimonios = rest
              )
          }
        )
    }
    this.obj.anuncioContratos.splice(i, 1);
    super.onsave();
  }
  printcontrato() {
    console.log(this.obj);
  /*const printContent = document.getElementById("componentID");
const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
 WindowPrt.document.write(printContent.innerHTML);
WindowPrt.document.close();
WindowPrt.focus();
WindowPrt.print();
WindowPrt.close();*/
let printContents = document.getElementById('componentID').innerHTML;
let originalContents = document.body.innerHTML;

document.body.innerHTML = printContents;

window.print();

document.body.innerHTML = originalContents;


 //    window.print();
    // this.spinner.hide();
    //window.open(url, '_blank');
  }
}
