import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'A <b>garantia legal</b> é estabelecida pelo <b>CDC (Código de Defesa do Consumidor)</b> e independe de previsão em contrato. A lei garante e ponto. Assim, você tem 30 dias para reclamar de problemas com o produto se ele não for durável (um alimento, por exemplo), ou <b>90 dias</b> se for durável (uma máquina de lavar, por exemplo)'

export class ResultWarrantyTimeController {
  get (product: any) {
    const warranty = product.sale_terms.filter(
      (item: any) => item.id === "WARRANTY_TIME"
    )

    if (
      warranty &&
      warranty.length &&
      warranty[0].values &&
      warranty[0].values.length &&
      warranty[0].values[0].struct.number
    )
      return getDescriptionResult(
        "Garantia",
        `Esse produto tem garantia de ${warranty[0].values[0].struct.number} ${warranty[0].values[0].struct.unit}`,
        false,
        content
      )

    return getDescriptionResult(
      "Garantia",
      "Esse produto não tem garantia. Cuidado!",
      true,
      content
    )
  }
}