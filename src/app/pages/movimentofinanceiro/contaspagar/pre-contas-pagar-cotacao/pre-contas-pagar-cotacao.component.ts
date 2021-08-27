import { Fornecedor } from './../../../../../models/fornecedor';
import { FinanceiroOrdem } from './../../../../../models/movimento/financeiro-ordem';
import { HistoricoContaPagar } from './../../../../../models/historico-conta-pagar';
import { ContasPagar } from './../../../../../models/movimento/contas-pagar';
import { FaturasDto } from './../../../../../models/faturas-dto';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreContasPagarDto } from './../../../../../models/estoque/pre-contas-pagar-dto';
import { SampleDto } from './../../../../../models/sample-dto';
import { ListGenericClass } from './../../../genericclasses/list-generic-class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-contas-pagar-cotacao',
  templateUrl: './pre-contas-pagar-cotacao.component.html',
  styleUrls: ['./pre-contas-pagar-cotacao.component.css']
})
export class PreContasPagarCotacaoComponent extends ListGenericClass implements OnInit {
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

  dateFormat = 'dd/MM/yyyy';
  total = 0;
  listcontaspagadtos: FaturasDto[];
  contaspagar: ContasPagar;

  isVisibleedit = false;
  precontapagar: PreContasPagarDto;
  validateForm!: FormGroup;
  produtos: SampleDto[];
  grupofinanceiro: SampleDto;

  bancos: SampleDto[];
  historicos: SampleDto[];
  centrocustos: SampleDto[];
  fornecedores: SampleDto[];
  filteredOptions: string[];
  current = 0;
  index = 'First-content';
  grupofinanceiros: SampleDto[];
  historicoContaPagar: string[];

  hs;
  load1 = '';

  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {

    super(modalService, router, nzMessage, servicegeral, 'precontaspagar', 'estoque/anuncios/anunciosloja/');

  }
  ngOnInit(): void {
    this.getLista();
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
    this.validateForm = this.fb.group({
      grupofinanceiro: [null, [Validators.required]],
      historico: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      centrocusto: [null, [Validators.required]],
      parcelas: [null, [Validators.required]],
      vencimento: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
    })
  }
  getLista() {
    //  this.mainAtiviadade.pagesample(this.controller, this.value, this.page - 1);
    this.servicegeral.getAnyPage(`${this.controller}/page`, this.value, this.page - 1)
      .then(
        (response) => {
          this.pages = response;
          this.isrealy = true;
          if (this.time) {
            clearInterval(this.time);
          }

        }
      )
  }

  loadpreconta(a: PreContasPagarDto) {
    console.log(a);

    this.precontapagar = a;
    this.showModal();
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  showModal(): void {
    this.hs = '';
    let fornecedor: SampleDto = {};
    fornecedor.id = this.precontapagar.cotacao.fornecedor.id;
    fornecedor.nome = this.precontapagar.cotacao.fornecedor.nome;

    this.contaspagar = {
      nome: 'Cotação de Cmpra de suprimentos/peças',
      descricao: 'Cotação de Compra de suprimentos/peças',
      imagem: '',
      extension: '',
      imagemView: '',
      fonercedor: {} as SampleDto,
      nf: '',
      valor: this.precontapagar.cotacao.total,
      dataAbertura: new Date(),
      historico: { nome: '' } as SampleDto,
      status: 'Aberto',
      grupoFinanceiro: {} as SampleDto,
      faturas: [] as FaturasDto[],
      financeiro: {
        banco: { nome: '' } as SampleDto,
        centroCusto: { nome: '' } as SampleDto,
        datavencimento: new Date(),
        faturavel: "Sim",
        parcelas: 1
      } as FinanceiroOrdem,
    };
    this.contaspagar.fornecedor = {
      id: this.precontapagar.cotacao.fornecedor.id,
      nome: this.precontapagar.cotacao.fornecedor.nome
    };
    console.log(this.contaspagar);

    this.isVisible = true;
    //  this.selectgrupo(this.grupofinanceiros[0].id);
  }

  onChange(value: string): void {
    try {
      this.filteredOptions = this.historicoContaPagar.filter(option =>
        option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      //  this.hs = '';
    } catch (error) {

    }
  }
  handleOk(): void {
    this.isVisible = false;
    this.showConfirm();
    this.contaspagar.status='Quit';
    this.servicegeral.saveobj(this.controller,this.contaspagar,this.contaspagar.id)
    .then(
      ()=>{
        this.getLista();
      }
    )
  }

  handleCancel(): void {

    this.isVisible = false;
  }

  showConfirm(): void {
    console.log(this.contaspagar);

    this.servicegeral.newobj(this.controller, this.contaspagar)
      .then(
        (rest) => {
          this.servicegeral.getAll(`${this.controller}/faturasopen`)
            .then(
              (rest) => {
                console.log(rest);

                this.listcontaspagadtos = rest;
                this.total = 0;
                this.listcontaspagadtos.forEach(el => {
                  this.total += el.total;
                });
                if (this.time) {
                  clearInterval(this.time);
                }
                this.isrealy = true;
              }
            )
        }
      )
  }

  //add Stap
  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {

    if (this.current === 0) {
      let m: HistoricoContaPagar = {
        nome: '',
        grupocontaspagardto: { id: this.contaspagar.grupoFinanceiro.id }
      } as HistoricoContaPagar;
      this.servicegeral.findbynome('historicocontapagar', this.hs)
        .then(
          rest => {
            if (rest != null) {
              m = rest;
              this.contaspagar.historico.id = rest.id;
              this.contaspagar.historico.nome = rest.nome;
            } else {
              this.modalService.confirm({
                nzTitle: 'Confirm',
                nzContent: 'Histórico inexistente. Deseja Adicionar Histórico: ' + this.hs + ' ?',
                nzOkText: 'OK',
                nzCancelText: 'Cancel',
                nzOnOk: () => {
                  m.nome = this.hs;
                  m.grupocontaspagardto = { id: this.contaspagar.grupoFinanceiro.id };
                  this.addhs(m);
                },
                nzOnCancel: () => {
                  return;
                }
              }
              );
            }
          }
        )
    }
    if (this.current === 3) {
      this.contaspagar.nome = this.contaspagar.historico.nome;
    }
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      } case 3: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
  addhs(m: SampleDto) {
    this.servicegeral.newobj('historicocontapagar', m)
      .then(
        (response) => {
          m.id = (response.body);

          this.contaspagar.historico.id = m.id;
          this.contaspagar.historico.nome = m.nome;
          this.historicoContaPagar.push(m.nome);
          this.filteredOptions.push(m.nome);
          (error) => {
            console.log(error);

          }
        }
      )
  }
  selectgrupo(event) {
    console.log(event);

    try {
      this.servicegeral.getAll(`historicocontapagar/getsampledtogetgrupo/${event}`)
        .then(
          rest => {
            console.log(rest);
            this.hs = '';
            this.historicoContaPagar = rest;
            if (this.historicoContaPagar.length > 0) {
              this.hs = this.historicoContaPagar[0]
            }
            this.filteredOptions = rest;
            this.grupofinanceiros.forEach(element => {
              if (element.id == event) {
                this.contaspagar.grupoFinanceiro.nome = element.nome;
              }
            });
          }
        )

    } catch (error) {
      event = 1;
      this.contaspagar.grupoFinanceiro = this.grupofinanceiros[1];
      this.servicegeral.getAll(`historicocontapagar/getsampledtogetgrupo/${event}`)
        .then(
          rest => {
            this.historicoContaPagar = rest;
            this.filteredOptions = rest;
            this.load1 = '';
          }
        )
    }


  }


  selectgrupobanco(event) {

    this.bancos.forEach(element => {
      if (element.id == event) {
        this.contaspagar.financeiro.banco.nome = element.nome;
      }
    });
  }
  selectgrupocc(event) {

    this.centrocustos.forEach(element => {
      if (element.id == event) {
        this.contaspagar.financeiro.centroCusto.nome = element.nome;
      }
    });
  }
}
