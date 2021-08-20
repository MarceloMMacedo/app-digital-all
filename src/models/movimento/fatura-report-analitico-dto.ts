import { SampleDto } from './../sample-dto';
export interface FaturaReportAnaliticoDto {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  parcela?: string,
  historico?: SampleDto,
  totalParcela?: number,
  numeroparcela?: number,
  dataVencimento?: Date,

  dataPagamento?: Date,
  total?: number,
  centroCusto?: SampleDto
}
