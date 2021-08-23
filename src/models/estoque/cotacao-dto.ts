
import { Contato } from './../contato';
import { Endereco } from './../endereco';
import { SampleDto } from './../sample-dto';
import { ItensCotacao } from './itens-cotacao';
export interface CotacaoDto {
  id?: number,
  nome?: string,
  dataAbertura?: Date,
  dataFim?: Date,
  fornecedor?: SampleDto;
  contato?: Contato,
  endereco?: Endereco,
  status?: string,
  itensCotacaos?: ItensCotacao[],
  total?: number,
  tipoFrete?: string,
  valorFrete?: number,
}
