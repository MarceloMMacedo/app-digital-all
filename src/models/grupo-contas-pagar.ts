
import { FaturasDto } from './faturas-dto';
import { HistoricoContaPagar } from './historico-conta-pagar';
export interface GrupoContasPagar {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  historicos?: HistoricoContaPagar[],
  saidasFuturo?:number,
  faturasAberta?:FaturasDto[],
}
