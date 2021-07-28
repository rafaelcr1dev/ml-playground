import { IPricesMean } from '../../interfaces'
import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'O <b>valor de mercado</b>, em economia, refere-se ao valor que um produto atinge no mercado, baseando-se na concorrência de mercado e lei de oferta e procura. Costuma-se contrapor o valor de mercado ao valor real do produto.';

export class ResultMarketValueController {
  constructor (
    private readonly pricesMeanController: IPricesMean
  ) {}

  get (product: any, similarProducts: any) {
    const pricesListSimilarProducts = similarProducts.map(
      (similar: any) => {
        return similar.price
      }
    )

    if (!pricesListSimilarProducts.length) return {}

    const percentBase = 10
    const meanValue = this.pricesMeanController.get(pricesListSimilarProducts, percentBase)
    const percentDiferenceBetweenPrices = Math.floor(
      (product.price * 100) / meanValue
    )

    if (percentDiferenceBetweenPrices < 50)
      return getDescriptionResult(
        "Valor de mercado",
        `Esse anuncio esta ${percentDiferenceBetweenPrices}% menor que os concorrentes`,
        true,
        content
      )

    return getDescriptionResult(
      "Valor de mercado",
      `Esse anuncio esta dentro do valor de mercado`,
      false,
      content
    )
  }
}