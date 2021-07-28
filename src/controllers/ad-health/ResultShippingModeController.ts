import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'O <b>Mercado Envios</b> é um serviço do <b>Mercado Livre</b> onde o próprio marketplace cuida do envio de produtos. O custo dos Correios fica por conta do <b>Mercado Livre</b>, assim como toda a proteção do produto até a entrega'

export class ResultShippingModeController {
  get (product: any) {
    if (product && product.shipping.mode !== "not_specified")
      return getDescriptionResult(
        "Entrega",
        "Esse anuncio faz a entrega por transportadora via Mercado livre",
        false,
        content
      )

    return getDescriptionResult(
      "Entrega",
      "Esse anuncio somente faz a entrega a combinar com o vendedor. Cuidado!",
      true,
      content
    )
  }
}