import { Banco } from './banco';
import { AgregadoGrupoContrato } from './AgregadoGrupoContrato';
import { FaturasDto } from './faturas-dto';
export interface GrupoFinanceiroContrato {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  agregados?: AgregadoGrupoContrato[],
  percentualTotal?: number,
  contratos?: any[],
  banco?: Banco;
  totalReceber?:number,
  faturasAberta?:FaturasDto[],
}
