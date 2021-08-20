import { HistoricoContaPagar } from './../../../../../../models/historico-conta-pagar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SampleDto } from './../../../../../../models/sample-dto';
import { Pessoa } from './../../../../../../models/pessoa';
import { ContasPagar } from 'src/models/movimento/contas-pagar';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-contaspagar',
  templateUrl: './add-contaspagar.component.html',
  styleUrls: ['./add-contaspagar.component.css']
})
export class AddContaspagarComponent implements OnInit {
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
  @Input() isVisible;
  @Input() contaspagar: ContasPagar;
  @Input() pessoa: Pessoa;
  @Input() controller;
  @Input() hs: string;

  @Output() listcontaspagadtos: EventEmitter<ContasPagar[]> = new EventEmitter<ContasPagar[]>();
  @Output() outisvisibel: EventEmitter<boolean> = new EventEmitter<boolean>();

  validateForm!: FormGroup;
  dateFormat = 'dd/MM/yyyy';
  isVisibleforn: boolean = false;
  current = 0;
  validateFormforn!: FormGroup;
  index: any;
  bancos: SampleDto[];
  historicos: SampleDto[];
  centrocustos: SampleDto[];
  fornecedores: SampleDto[];
  grupofinanceiros: SampleDto[];
  historicoContaPagar: string[];
  filteredOptions: string[];



  constructor(
    public modalService: NzModalService,
    private fb: FormBuilder,
    public nzMessage: NzMessageServiceModule,
    public servicegeral: SeviceGeralService
  ) { }

  ngOnInit(): void {
    this.pessoa = { nome: '', cnpj: '' } as Pessoa;
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
          this.selectgrupo(this.grupofinanceiros[0].id);
        }
      );
    this.servicegeral.getAllsampledto('fornecedores')
      .then(
        rest => {
          console.log(rest);
          this.fornecedores = rest;
        }
      )
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
  handleOk(): void {
    this.isVisible = false;
    this.outisvisibel.emit(false);
    this.showConfirm();
  }

  handleCancel(): void {

    this.isVisible = false;

    this.outisvisibel.emit(false);
  }
  showConfirm(): void {
    console.log(this.contaspagar);

    this.servicegeral.newobj(this.controller, this.contaspagar)
      .then(
        (rest) => {
          this.servicegeral.getAll(`${this.controller}/contaspagardto`)
            .then(
              (rest) => {
                this.listcontaspagadtos.emit(rest);
              }
            )
        }
      )
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
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
              console.log(error);

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

            this.historicoContaPagar = rest;
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
}
