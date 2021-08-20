import { SampleDto } from './sample-dto';

import { CentroCusto } from './centro-custo';
import { Banco } from './banco';
import { FaturasDto } from './faturas-dto';
import { GrupoContasPagar } from './grupo-contas-pagar';
export interface HistoricoContaPagar {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  banco?: Banco,
  centroCusto?: CentroCusto,
  grupocontaspagardto:SampleDto,
  saidasFuturo?:number,
  faturasAberta?:FaturasDto[],
}
