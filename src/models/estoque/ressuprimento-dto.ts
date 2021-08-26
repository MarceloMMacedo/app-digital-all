import { SampleDto } from './../sample-dto';
export interface ItensReposicaoDto {
  descricao?: string,
  qtd?: number,
  tipoAnuncio?: string,
  anuncio?: number,
  valorinterno?: number,
  valor?: number,
  idinfo:any,
  unidade?:string,
  subtotal?:number,
}

export interface RessuprimentoDto {
  itensAnuncioLoja?: ItensReposicaoDto[],
  totalitensAnuncioLoja?: number,
  itensAnuncioWeb?: ItensReposicaoDto[],
  totalitensAnuncioWeb?: number,
  itensAnuncioContrato?: ItensReposicaoDto[],
  totalitensAnuncioContrato?: number,
}
