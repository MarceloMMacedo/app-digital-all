import { ItemProdutoAnuncio } from './item-produto-anuncio';
import { GrupoFinanceiroAnuncio } from './grupo-financeiro-anuncio';
import { BaseDto } from './base-dto';
export interface AnuncioContrato {
  id?: number,
  nome?: string,
  modelo?: BaseDto,
  valor?: number,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,

  grupopreco?: BaseDto,
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
  unidade?: string,
  valorInterno?: number,
  valorFinal?: number,
  saldoReposicao?: number,
  itensProduto?: ItemProdutoAnuncio[];
}
