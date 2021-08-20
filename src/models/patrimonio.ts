import { RemocaoPatrimonio } from './remocao-patrimonio';
import { SampleDto } from './sample-dto';
import { Medidores } from './medidores';
import { Medidor } from './medidor';
import { Modelo } from './modelo';
export interface Patrimonio {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  tipo?: string;
  serial?: string;
  modelo?: Modelo,
  codPatrimonio?: string,
  medidoresInicial?: Medidor,
  medidores?: Medidores,
  contrato?: SampleDto,
  medidorServico?: Medidor,
  medidorContrato?: Medidor,
  valoraquisicao?: number,
  dataAquicao?: Date,
  status?: string,
  remocaoPatrimonio?:RemocaoPatrimonio,
}
