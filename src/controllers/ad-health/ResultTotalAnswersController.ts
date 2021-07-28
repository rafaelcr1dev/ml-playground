import { getDescriptionResult } from '../../utils/getDescriptionResult'
import { IQuestion } from '../../interfaces'

const content = 'Os usuários podem avaliar os vendedores direto do seu painel de Pedidos, clicando nos três pontinhas na frente de “Ver detalhe” que aparecem na frente de cada compra e em seguida, clicando em “Opinar sobre o vendedor”'

export class ResultTotalAnswersController {
  constructor(private readonly questionModel: IQuestion) {}

  async get (product: any) {
    const response = await this.questionModel.select(product.id)
    const questions = await response.json()

    if (!questions.questions || !questions.questions.length) return;

    const answers = questions.questions.filter(
      (question: any) => question.answer != null
    )
    const percentAnswers = Math.floor(
      (answers.length * 100) / questions.questions.length
    )

    if (percentAnswers > 60)
      return getDescriptionResult(
        "Resposta de comentários",
        `Esse lojista costuma responder mais de ${percentAnswers}% das duvidas dos clientes`,
        false,
        content
      )

    return getDescriptionResult(
      "Resposta de comentários",
      "Esse lojista não costuma responder as perguntas dos clientes. Cuidado!",
      true,
      content
    )
  }

}