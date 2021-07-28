import { getDescriptionResult } from '../../utils/getDescriptionResult'

const content = 'Podemos definir domínio como sendo o nome de um site. Também conhecido como endereço eletrônico ou URL, o domínio é o endereço do seu site na internet.'

export class ResultValidURLController {
  get (url: string) {
    if (url && ~url.indexOf(".mercadolivre."))
      return getDescriptionResult(
        "Domínio",
        "Esse anuncio é original do Mercado live",
        false,
        content
      )

    return getDescriptionResult(
      "Domínio",
      "Esse anuncio não é original do Mercado live. Cuidado nao compre!",
      true,
      content
    )
  }
}