import { Pessoa } from './../../../../../models/pessoa';
import { HistoricoContaPagar } from './../../../../../models/historico-conta-pagar';
import { FinanceiroOrdem } from './../../../../../models/movimento/financeiro-ordem';
import { FaturasDto } from './../../../../../models/faturas-dto';
import { SampleDto } from './../../../../../models/sample-dto';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { ContasPagar } from 'src/models/movimento/contas-pagar';

declare var require: any;
@Component({
  selector: 'app-list-contas-pagar',
  templateUrl: './list-contas-pagar.component.html',
  styleUrls: ['./list-contas-pagar.component.css']
})
export class ListContasPagarComponent implements OnInit {
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
  contaspagar: ContasPagar;
  isVisible = false;
  validateForm!: FormGroup;
  validateFormforn!: FormGroup;
  time;
  isrealy: boolean = false;
  current = 0;
  index = 'First-content';
  grupoFinanceiro: SampleDto[];
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
  pessoa: Pessoa;
  controller = 'contaspagar';
  empresa;
  total;
  constructor(
    public modalService: NzModalService,
    public router: Router,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService) {
  }

  ngOnInit(): void {
    this.pessoa = { nome: '', cnpj: '' } as Pessoa;
    this.isrealy = false;
    this.servicegeral.getAll('empresas')
      .then(
        (rest) => {
          this.empresa = rest
          ////console.log(rest);

        }
      )
      this.total = 0;

    this.servicegeral.getAllsampledto('bancos')
      .then(
        rest => {
          this.bancos = rest;
          //console.log(rest);

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
          this.grupoFinanceiro = rest;
          this.selectgrupo(this.grupoFinanceiro[0].id);
        }
      );
    this.servicegeral.getAllsampledto('fornecedores')
      .then(
        rest => {
          //console.log(rest);
          this.fornecedores = rest;
        }
      )
    this.time = setInterval(async () => {
      this.isrealy = false;
      try {
        this.servicegeral.getAll(`${this.controller}/contaspagardto`)
          .then(
            (rest) => {
              //console.log(rest);

              this.listcontaspagadtos = rest;
              this.total = 0;
              this.listcontaspagadtos.forEach(el => {
                this.total += el.totalAberto;
              });
              if (this.time) {
                clearInterval(this.time);
              }
              this.isrealy = true;
            }
          )
      } catch (error) {

      }
    }, 500);
    this.validateForm = this.fb.group({
      grupofinanceiro: [null, [Validators.required]],
      historico: [null, [Validators.required]],
      fornecedor: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      centrocusto: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      parcelas: [null, [Validators.required]],
      vencimento: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
    })
    this.validateFormforn = this.fb.group({
      cnpj: [null, [Validators.required]],
      nome: [null, [Validators.required]],
    })
  }
  ngOnDestroy(): void {

    if (this.time) {
      clearInterval(this.time);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  showModal(): void {
    this.hs = '';
    this.contaspagar = {
      nome: '',
      descricao: '',
      imagem: '',
      extension: '',
      imagemView: '',
      fonercedor: { nome: '' } as SampleDto,
      nf: '',
      valor: 0,
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
    this.isVisible = true;
    //  this.selectgrupo(this.grupoFinanceiro[0].id);
  }
  handleOk(): void {
    this.isVisible = false;
    this.showConfirm();
  }

  handleCancel(): void {

    this.isVisible = false;
  }

  showConfirm(): void {
    console.log(this.contaspagar);

    this.servicegeral.newobj(this.controller, this.contaspagar)
      .then(
        (rest) => {
          this.servicegeral.getAll(`${this.controller}/contaspagardto`)
            .then(
              (rest) => {
                //console.log(rest);

                this.listcontaspagadtos = rest;
                this.total = 0;
                this.listcontaspagadtos.forEach(el => {
                  this.total += el.totalAberto;
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
    //console.log('done');
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
            //console.log(error);

          }
        }
      )
  }
  selectgrupo(event) {
    try {
      this.servicegeral.getAll(`historicocontapagar/getsampledtogetgrupo/${event}`)
        .then(
          rest => {
            //console.log(rest);

            this.historicoContaPagar = rest;
            this.filteredOptions = rest;
            this.grupoFinanceiro.forEach(element => {
            try {
              if (element.id == event) {
                this.contaspagar.grupoFinanceiro.nome = element.nome;
              }
            } catch (error) {

            }
            });
          }
        )

    } catch (error) {
      event = 1;
      this.contaspagar.grupoFinanceiro = this.grupoFinanceiro[1];
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
  onChange(value: string): void {
    try {
      this.filteredOptions = this.historicoContaPagar.filter(option =>
        option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      //  this.hs = '';
    } catch (error) {

    }

  }
  //fornecedor
  submitFormforn(): void {
    for (const i in this.validateFormforn.controls) {
      this.validateFormforn.controls[i].markAsDirty();
      this.validateFormforn.controls[i].updateValueAndValidity();
    }
  }
  handleOkforn(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja incluir fornecedor: ' + this.pessoa.nome + ' ?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.servicegeral.newobj('fornecedores', this.pessoa)
          .then(
            (response) => {
              let p: SampleDto = { id: response, nome: this.pessoa.nome } as SampleDto;
              this.fornecedores.push(p);

            },
            (error) => {
              //console.log(error);

            }
          )
      },
      nzOnCancel: () => {
        return;
      }
    }
    );
    this.isVisibleforn = false;
  }

  handleCancelforn(): void {

    this.isVisibleforn = false;
  }

  showModalforn(): void {
    this.pessoa = { nome: '', cnpj: '', email: '' } as Pessoa;
    this.isVisibleforn = true;
  }
  opdatecnpj(): void {
    this.servicegeral.getcnpj('fornecedores', 0, this.pessoa.cnpj)
      .then(
        rest => {
          this.pessoa = rest;

        }
      )
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
  selectgrupoforn(event) {

    this.fornecedores.forEach(element => {
      if (element.id == event) {
        this.contaspagar.fonercedor.nome = element.nome;
      }
    });
  }


  print() {

    let printContents = document.getElementById('componentID').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    location.reload();
  }
}
