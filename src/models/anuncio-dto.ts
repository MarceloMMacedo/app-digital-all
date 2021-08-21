import { SampleDto } from './sample-dto';
import { GrupoFinanceiroAnuncio } from './grupo-financeiro-anuncio';
import { ListaImagens } from './estoque/lista-imagens';
import { DescricaoAnuncio } from './estoque/descricao-anuncio';

import { ItemProdutoAnuncio } from './item-produto-anuncio';
import { BaseDto } from './base-dto';
export interface AnuncioDto {

  id?: number,
  nome?: string,
  descricao?: string,
  grupopreco?: SampleDto,
  dataVencimento?: Date,
  saldo?: number,
  saldoMinimo?: number,
  saldoReserva?: number,
  saldoMaximo?: number,
  status?: string,
  // valorInterno?: number,
  saldoReposicao?: number,
  valorFinal?: number,
  peso?: number,
  largura?: number,
  comprimento?: number,
  altura?: number,
  unidade?: string,
  itensProduto?: ItemProdutoAnuncio[],
  descricoes?: DescricaoAnuncio[],
  imagens?: ListaImagens[],
  imagem?: string,
  imagemView: string,
  extension?: string,
  desconto?: number,
  isPrecificado?: string,
  valorInterno?: number,
  tocontrato?: SampleDto,
}
