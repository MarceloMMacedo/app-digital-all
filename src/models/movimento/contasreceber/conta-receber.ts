import { SampleDto } from './../../sample-dto';
import { FaturasDto } from './../../faturas-dto';

export interface ContaReceber {
  cliente?: SampleDto,
  ordemvenda?: SampleDto,
  ordemservico?: SampleDto,
  datainicio?: Date,
  datafim?: Date,
  faturasContrato?: FaturasDto[],
  totalContrato?: number,
  faturasVendas?: FaturasDto[],
  totalVenda?: number,
  faturasServico?: FaturasDto[],
  totalServico?: number,
  total?: number,
}
