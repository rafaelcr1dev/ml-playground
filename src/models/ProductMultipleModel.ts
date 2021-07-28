import apis from '../config/apis'

import { IProductMultiple } from '../interfaces'

export class ProductMultipleModel implements IProductMultiple {
  select = (paramsString: string) => {
    return fetch(`${apis.endpoint.items}?ids=${paramsString.substring(1)}`)
  }
}