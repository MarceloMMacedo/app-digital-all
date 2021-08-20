import { SampleDto } from './../sample-dto';
export interface FinanceiroOrdem {
  banco?: SampleDto,
  centroCusto?: SampleDto,
  datavencimento?: Date
  faturavel?: string,
  parcelas?: number

}
