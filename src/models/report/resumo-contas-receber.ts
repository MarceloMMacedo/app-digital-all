import { DataChart } from './data-chart';
import { ItemMonthReportDto } from './item-month-report-dto';
export interface ResumoContasReceber {
  nome?: string,
  valor?: number,
  exercicio?: number,
  totalresumocontratos?: number,
  totalresumovendas?: number,
  totalresumoservicos?: number,
  totalresumopagar?: number,
  lineChartLabels?: string[],
  resumocontratos?: ItemMonthReportDto[],
  resumovendas?: ItemMonthReportDto[],
  resumoservicos?: ItemMonthReportDto[],
  resumopagar?: ItemMonthReportDto[],
  chartscontrato?: DataChart,
  chartsvendas?: DataChart,
  chartsservicos?: DataChart,
  chartspagar?: DataChart,
}
