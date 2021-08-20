import { Contato } from './contato';
import { Endereco } from './endereco';
export interface PessoaSampleDto {
  id?: number,
  nome?: string,
  endereco?: Endereco,
  contato?: Contato,
  cnpj?: string,
  imagemview?:string,
}
