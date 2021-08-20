
import { FaturasDto } from './faturas-dto';
export interface Banco {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  banco?: string,
  agencia?: string,
  conta?: string,
  saldo?: number,
  entradasFuturo?: number,
  saidasFuturo?: number,
  faturasAbertaEntrada?:FaturasDto[],
  faturasaAbertaPagar?:FaturasDto[],
  faturasAberta?:FaturasDto[],


}
