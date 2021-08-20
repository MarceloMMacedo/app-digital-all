
import { ItemProdutoAnuncio } from './item-produto-anuncio';
import { BaseDto } from './base-dto';
export interface AnuncioDto {
  id?: number,
  nome?: string,
  grupopreco?: BaseDto,
  unidade?: string,
  dataVencimento?: Date,

  status?: string,
  saldo?: number,
  saldoMinimo?: number,
  saldoReserva?: number,
  saldoMaximo?: number,
  peso?: number,
  largura?: number,
  comprimento?: number,
  altura?: number,
  valorInterno?: number,
  valorFinal?: number,
  saldoReposicao?: number,
  itensProduto?: ItemProdutoAnuncio[];
}
