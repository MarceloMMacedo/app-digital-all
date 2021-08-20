import { SampleDto } from './../models/sample-dto';
import { CentroCusto } from './../models/centro-custo';
import { Banco } from './../models/banco';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewObjectService {

  constructor() { }

  contato = {
    contato: '',
    emailcontato: '',
    telefonecontato: '',
    setorcontato: '',
  }
  endereco = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    numero: '',
    uf: '',
    ibge: '',
    gia: '',
    ddd: '',
    siafi: '',
  }
  historicocontasapagar = {
    nome: '',
    descricao: '',
    imagem: '',
    extension: '',
    imagemView: '',
    grupocontaspagardto:{} as SampleDto,
    banco: {} as Banco,
    centroCusto: {} as CentroCusto,

  }
  agregadocontrato = {
    centroCusto: {} as CentroCusto,
    percentual: 0,
    nome: '',
  }
}
