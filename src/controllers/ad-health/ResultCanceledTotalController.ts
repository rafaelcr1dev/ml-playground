import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'A primeira etapa na entrega no <b>e-commerce</b> é a notificação, ou seja, o momento em que a loja virtual recebe o aviso de um novo <b>pedido realizado</b>. Em seguida, o ou os produtos selecionados devem ser separados no estoque da loja para envio.'

export class ResultCanceledTotalController {
  get (product: any, similarProducts: any) {
    let searchProduct = similarProducts.filter(
      (similar: any) => product.id === similar.id
    )

    if (!searchProduct.length) return {}

    const {
      seller: { seller_reputation },
    } = searchProduct[0]
    const percentTransactionsCanceled = Math.floor(
      (seller_reputation.transactions.canceled * 100) /
        seller_reputation.transactions.completed
    )

    if (searchProduct && percentTransactionsCanceled < 40)
      return getDescriptionResult(
        "Pedidos",
        `Esse logista tem apenas ${percentTransactionsCanceled}% de pedidos cancelados`,
        false,
        content
      )

    return getDescriptionResult(
      "Garantia",
      `Esse logista tem ${percentTransactionsCanceled}% de pedidos cancelados`,
      true,
      content
    )
  }
}