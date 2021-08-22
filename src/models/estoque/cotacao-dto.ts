import { Contato } from './../contato';
import { Endereco } from './../endereco';
import { SampleDto } from './../sample-dto';
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
export interface ItensCotacao {
  produto?: SampleDto,
  quantidade?: number,
  valor?: number,
  anuncio?: SampleDto,
  tipoAnuncio?: string,
  total?: number,
}
