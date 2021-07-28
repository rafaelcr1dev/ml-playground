import { getRandomItem } from '../../utils/getRandomItem'
import { categories } from '../../config/categories'
import { IProductCategory } from '../../interfaces';

import { serializeProducts } from '../../utils/serializeProducts'
import errors from '../../errors/messages'

export default class RandomProductCategoryController {
  constructor (private readonly productCategoryModel: IProductCategory) {}

  async select () {
    const category = getRandomItem(categories);
    const response = await this.productCategoryModel.select(category.id)
    const { error, results } = await response.json()

    if (error || !results.length) throw new Error(errors.not_founds_results);

    return {
      product: serializeProducts(getRandomItem(results)),
      category: category
    }
  }
}