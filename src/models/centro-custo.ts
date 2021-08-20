import { FaturasDto } from './faturas-dto';

export interface CentroCusto {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  entradasFuturo?: number,
  saidasFuturo?: number,
  valorPagar?: number,
  valorReceber?: number,
  saldo?: number,
  faturasAbertaEntrada?:FaturasDto[],
  faturasaAbertaPagar?:FaturasDto[],
  faturasAberta?:FaturasDto[],

}
