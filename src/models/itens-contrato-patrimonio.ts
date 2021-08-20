import { BaseDto } from './base-dto';
import { Contato } from './contato';
import { Endereco } from './endereco';
import { Medidor } from './medidor';
import { Patrimonio } from './patrimonio';
export interface ItensContratoPatrimonio {
  id?: number,
  nome?: string,
  setor?:string,
  patrimonio?: BaseDto,
  valorUnitarioFranquia?: number,
  isFranquado?: string,
  franquia?: number,
  valorFranquia?: number,
  valorPreDeterminado?: number,
  dataInstalacao?: Date
  medidorInstalacao?: Medidor,
  endereco?: Endereco,
  contato?: Contato,
  valorFinal?: number,
}
