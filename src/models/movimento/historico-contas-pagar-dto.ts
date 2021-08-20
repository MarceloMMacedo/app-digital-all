import { FaturasDto } from './../faturas-dto';
import { FaturaReportAnaliticoDto } from './fatura-report-analitico-dto';
export interface HistoricoContasPagarDto {
  nome?: string,
  analiticoDtos?: FaturasDto[],
  total?:number
}
