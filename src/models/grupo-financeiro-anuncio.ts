import { AgregadoGrupoContrato } from './AgregadoGrupoContrato';
export interface GrupoFinanceiroAnuncio {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  agregadoGrupo?: AgregadoGrupoContrato[],
  percentualDesconto?: number,
  //  banco?: Banco;
  percentualTotal?: number,
  //  faturasAberta?:FaturaDto[],
}
