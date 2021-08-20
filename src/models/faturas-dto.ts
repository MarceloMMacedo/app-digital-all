import { FichaLeitura } from './movimento/contasreceber/ficha-leitura';
import { SampleDto } from './sample-dto';
export interface FaturasDto {
  id?: number,
  nome?: string,
  descricao?: string,
  idordem?:number;
  origem?: string,
  numeroparcela?: number,
  parcela:string,
  dataVencimento?: Date,
  dataPagamento?: Date,
  diaQuitacao?: Date,
  referente?: string,
  status?: string,
  valor?: number,
  jurus?: number,
  multa?: number,
  desconto?: number,
  total?: number,
  fornecedor:SampleDto;
  banco:SampleDto,
  fichaLeitura:FichaLeitura[]
}
