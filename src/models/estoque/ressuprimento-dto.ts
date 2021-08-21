import { SampleDto } from './../sample-dto';
export interface ItensReposicaoDto {
  descricao?: string,
  qtd?: number,
  tipoanuncio?: string,
  anuncio?: SampleDto,
  valorinterno?: number,
  valor?: number,
  setcotacao:any,
}

export interface RessuprimentoDto {
  itensAnuncioLoja?: ItensReposicaoDto,
  totalitensAnuncioLoja?: number,
  itensAnuncioWeb?: ItensReposicaoDto,
  totalitensAnuncioWeb?: number,
  itensAnuncioContrato?: ItensReposicaoDto,
  totalitensAnuncioContrato?: number,
}
