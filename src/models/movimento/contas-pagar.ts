import { FaturasDto } from './../faturas-dto';
import { FinanceiroOrdem } from './financeiro-ordem';
import { SampleDto } from './../sample-dto';
export interface ContasPagar {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  fonercedor?: SampleDto,
  nf?: string,
  valor?: number,
  dataAbertura?: Date,
  historico?: SampleDto,
  status?: string,
  grupoFinanceiro?: SampleDto,
  faturas?: FaturasDto[],
  financeiro?: FinanceiroOrdem
  faturasAberta?: FaturasDto[],
  faturasQuit?: FaturasDto[],
  totalAberto?: number,
  totalQuit?: number,
  contasPagar?: SampleDto,

  fornecedor?: SampleDto,

  banco?: SampleDto,

  centroCusto?: SampleDto,



}
