import { SampleDto } from './../sample-dto';
export interface FaturaPagar {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,

  numeroparcela?: string,
  dataVencimento?: Date,
  dataPagamento?: Date,
  diaQuitacao?: Date,
  referente?: string,
  status?: string,
  valor?: number,
  jurus?: number,
  multa?: number,
  desconto?: number,
  total?: number,

  historico?: SampleDto,
  grupofinanceiro?: SampleDto,
  fornecedor?: SampleDto,
  centroCusto?: SampleDto,
  totalParcela?: number,
  banco?: SampleDto,

}
