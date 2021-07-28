import { serializeProduct } from '../../utils/serializeProduct'

export class SerializeProductsController {
  get = (products:any[]) => {
    return products.map((item:any) => {
      return serializeProduct(item.body)
    }).filter((item:any) => item.video_id)
  }
}