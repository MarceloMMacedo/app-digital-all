import { SampleDto } from './../sample-dto';
export interface ListCotacaoDto {
  id?: number,
  nome?: string,
  dataAbertura?: Date,
  dataFim?: Date,
  fornecedor?: SampleDto;
  status?: string,
  total?: number,
  tipoFrete?: string,
  valorFrete?: number,
}
