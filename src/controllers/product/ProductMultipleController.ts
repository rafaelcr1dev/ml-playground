import { convertIdItemsToParamsString } from '../../utils/convertIdItemsToParamsString'

import { ISerializeProducts, IProductMultiple } from '../../interfaces'
import errors from '../../errors/messages'

export class ProductMultipleController {
  constructor (
    private readonly productMultipleModel: IProductMultiple,
    private readonly serializeProductsController: ISerializeProducts
  ) {}

  selectByIdItems = async(products: any) => {
    const paramsStringIdItems = convertIdItemsToParamsString(products)

    const response = await this.productMultipleModel.select(paramsStringIdItems)
    const multiples = await response.json()

    const { error } = multiples;

    if (error) throw new Error(errors.not_founds_results);

    return this.serializeProductsController.get(multiples)
  }
}