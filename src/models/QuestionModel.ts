import apis from '../config/apis'

import { IQuestion } from '../interfaces'

export class QuestionModel implements IQuestion {
  select = (itemId: string) => {
    return fetch(`${apis.endpoint.questions}?item_id=${itemId}&_v=${new Date().getTime()}`)
  }
}