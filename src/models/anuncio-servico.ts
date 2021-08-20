import { GrupoFinanceiroAnuncio } from './grupo-financeiro-anuncio'
export interface AnuncioServico {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  grupopreco: GrupoFinanceiroAnuncio,
  valorFinal?: number,
  valorInterno?: number,
  desconto?: number,
  isPrecificado?: string,
  valorPredefinido?: number,


}
