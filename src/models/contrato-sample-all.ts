import { PessoaSampleDto } from './pessoa-sample-dto';
export interface ContratoSampleAll {
  id?: number,
  nome?:string,
  cliente?: PessoaSampleDto,
  dataInicio?: Date,
  periodo?: number,
  diaLeitura?: number,
  valorFinal?: number,
}
