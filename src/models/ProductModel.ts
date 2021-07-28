import apis from '../config/apis'

import { IProduct } from '../interfaces'

export class ProductModel implements IProduct {
  show = (itemId: string) => {
    return fetch(`${apis.endpoint.items}/${itemId}`)
  }
}