import { Contato } from './contato';

import { Endereco } from './endereco';
import { Billing } from './billing';
import { QualName } from './qual-name';
import { TextCode } from './text-code';
export interface Pessoa {
  id?: number,
  data_situacao?: Date,
  tipo?: string,
  situacao?: string,
  endereco?: Endereco,
  enderecos?: Endereco[],
  porte?: string,
  abertura?: Date,
  natureza_juridica?: string,
  fantasia?: string,
  cnpj?: string,
  ultima_atualizacao?: string,
  status?: string,
  motivo_situacao?: string,
  situacao_especial?: string,
  data_situacao_especial?: Date,
  capital_social?: number,
  nome?: string,
  descricao?: string,
  ie?: string,
  telefone?: string,
  contato?:Contato,
  contatos?:Contato[],
  imagem?: string,
  extension?: string,
  limitecredito?: number,
  email?: string,
  rolers?: string,
  tipoFornecedor?: string
  atividade_principal?: TextCode[],
  atividades_secundarias?: TextCode[],
  qsa?: QualName[],
  extra?: any,
  billing?: Billing,
  imagemView?:string,
  mesFerias?:string,
  salario?:number,
  nomeGuerra?:string

}
