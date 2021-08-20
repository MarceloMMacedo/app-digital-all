import { HistoricoContasPagarDto } from './historico-contas-pagar-dto';
export interface ContasPagarDtoReport {
  nome?: string,
  historicoContasPagarDtos?: HistoricoContasPagarDto[],
  total?: number
}
