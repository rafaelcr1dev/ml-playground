import apis from '../config/apis'

import { IProductCategory } from '../interfaces'

export class ProductCategoryModel implements IProductCategory {
  select = (categoryId: string) => {
    return fetch(`${apis.endpoint.search_products()}?category=${categoryId}`)
  }
}