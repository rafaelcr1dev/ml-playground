import { serializeProducts } from '../../utils/serializeProducts'
import { getDiscount } from '../../utils/getDiscount'

import { ISearch } from '../../interfaces'
import errors from '../../errors/messages'

export class SimilarProductsController {
  constructor (private readonly productSearchController: ISearch) {}

  getProductsBestPrice = async (product: any) => {
    if (!product.id) throw new Error(errors.not_found_id_product);

    const response = await this.productSearchController.select(product?.customData?.title)
    
    return response.map((item:any) => {
      item.discount = getDiscount(product, item)

      return serializeProducts(item)
    }).filter((item:any) => item.discount < 0 && product.customData.condition === item.condition && product.id != item.id)
  }

  getProductsByQueryString = async (title: string) => {
    const queryString: string[] = title.match(/[a-zA-Z0-9\s]{0,}/g) || []
    const response = await this.productSearchController.select(`${encodeURIComponent(queryString[0])}&v=${new Date().getTime()}`)
    const { status } = response;

    if (status === 404) throw new Error(errors.not_founds_results)

    return response;
  }
}