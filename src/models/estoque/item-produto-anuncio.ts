import { SampleDto } from './../sample-dto';

export interface ItemProdutoAnuncio {
  produto?: SampleDto;
  quantidade?: number;
  valor?: number;
  subtotal?: number;
  descricao?: string;
}
