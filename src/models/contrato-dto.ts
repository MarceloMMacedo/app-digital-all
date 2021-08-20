import { SampleDto } from './sample-dto';
import { FaturasDto } from './faturas-dto';
import { ItensContratoPatrimonio } from './itens-contrato-patrimonio';
import { PessoaSampleDto } from './pessoa-sample-dto';
import { AnuncioContrato } from './anuncio-contrato';
export interface ContratoDto {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  empresa?: PessoaSampleDto;
  cliente?: PessoaSampleDto;
  grupoFinanceiro?:SampleDto;
  dataInicio?: Date,
  periodo?: number,
  diaLeitura?: number,
  diaVencimento?: number,
  itenspatrimonio?: ItensContratoPatrimonio[];
  faturaContratos?: FaturasDto;
  valorFinal?: number,
  anuncioContratos?: AnuncioContrato[],
  faturaAberta?: FaturasDto[],
  faturaQuit?: FaturasDto[],
  valorAberto?: number,
  valorQuitado?: number,

}
