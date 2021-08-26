import { CotacaoDto } from "./cotacao-dto";

export interface PreContasPagarDto {
  cotacao?:CotacaoDto,
  status?:string,
}
