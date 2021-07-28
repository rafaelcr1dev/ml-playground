import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'O <b>Mercado Pago</b> é a carteira digital do <b>Mercado Livre</b>. Ele funciona gerenciando suas vendas no site de e-commerce e você pode utilizar o seu saldo para realizar compras em diversas lojas ou adquirir serviços variados como recargas de celular e bilhetes de transporte.'

export class ResultAcceptMercadoPagoController {
  get (product: any) {
    if (product && product.accepts_mercadopago)
      return getDescriptionResult(
        "Mercado Pago",
        "Esse anuncio aceita pagamento pelo Mercado pago",
        false,
        content
      )

    return getDescriptionResult(
      "Mercado Pago",
      "Esse anuncio não aceita pagamento pelo Mercado pago. Cuidado não compre!",
      true,
      content
    )
  }
}