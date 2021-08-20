import { BaseDto } from './base-dto';
export interface ItemProdutoAnuncio {
  produto?: BaseDto,
  quantidade?: number,
  valor?: number,
  subtotal?: number,
  descricao?: string,
}
