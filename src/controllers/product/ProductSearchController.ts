import { ISearch } from '../../interfaces'
import errors from '../../errors/messages'

export class ProductSearchController {
  constructor (private readonly searchModel: ISearch) {}

  select = async(querySearch: string) => {
    if (!querySearch) throw new Error();

    const response = await this.searchModel.select(querySearch)
    const { status, results } = await response.json()

    if (status === 404) throw new Error(errors.not_founds_results);

    return results;
  }

  getProductById = async(itemId: string) => {
    if (!itemId) throw new Error();

    const response = await this.searchModel.select(itemId)
    const product = await response.json()

    if (!product || !product.id) throw new Error(errors.not_founds_results);

    return product;
  }

  getProductIdByUrl = (url: string) => {
    if (!url) throw new Error(errors.not_found_url_product);

    const list = url.match(/ML[A-Z]{1,}-?([0-9]{1,})/)

    if (!list?.length) throw new Error(errors.not_found_id_product);

    const itemId = list[0].replace('-', '').replace('p/', '');

    if (!itemId) throw new Error(errors.not_found_id_product);

    return itemId;
  }
}