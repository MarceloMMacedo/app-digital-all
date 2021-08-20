import { ItensContratoPatrimonio } from './../../itens-contrato-patrimonio';
import { Medidor } from './../../medidor';
import { SampleDto } from './../../sample-dto';
import { Data } from "@angular/router"



export interface FichaLeitura {
  itensContratoPatrimonio?:ItensContratoPatrimonio,
  dataLeitura?: Date,
  valorContrato?: number,
  medidorAnteriorA3?: number,
  medidorAnteriorA4?: number,
  medidorConvertidoA4?: number,
  excedente?: number,
  producao?: number,
  valorExcedente?: number,
  valorFinal?: number,
  contrato?: SampleDto,
  status?: string,
  medidores?:Medidor
}
