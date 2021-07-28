import apis from '../config/apis'

import { ISearch } from '../interfaces'

export class SearchModel implements ISearch {
  select = (querySearch: string) => {
    return fetch(`${apis.endpoint.search_products()}?q=${querySearch}`)
  }
}