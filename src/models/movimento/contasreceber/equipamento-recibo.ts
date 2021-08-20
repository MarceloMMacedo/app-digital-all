import { Contato } from './../../contato';
import { Endereco } from './../../endereco';
import { SampleDto } from './../../sample-dto';

export interface ReciboDto {
  cliente?: SampleDto,
  ndereco?: Endereco,
  contato?: Contato,
  data?: Date,
  descricao?: string,
  atividade?: string,
  setorentrega?: string,
  id?: number,
  valor?: number,
  itensrecibos?: ItemReciboDto[];
}
export interface ItemReciboDto {
  qtd?: number,
  descricao?: string,
  valorUnitarioqtd?: number,
  valortotalqtd?: number,
}

export interface ReciboContratoDto {
  descricao?: string,
  periodo?: string,
  valor?: number,
  acrecimosatraso?: number,
  valorexcedente?: number,
  vencimento?: Date,
  idcontrato?: number,
  idfatura?: number,
  valorcontrato?: number,
  equipamentos?: EquipamentoRecibo[],
}


export interface EquipamentoRecibo {
  imagem?: string,
  serial?: string,
  setor?: string,
  valor?: number,
  idpatrimonio?: number,
  descricao?: string,
  medidorAnteriorA3?: number,
  producao?: number,
  valorExcedente?: number,
  medidorAnteriorA4?: number,
  medidorAnteriorfinalA3?: number,
  medidorAnteriorfinalA4?: number,
  valorFinal?: number,
  excedente?: number,
}
