const API_PATH = 'https://api.mercadolibre.com';

export default {
  endpoint: {
    search_products: (type = 'MLB') => `${API_PATH}/sites/${type}/search`,
    items: `${API_PATH}/items`,
    categories: `/sites/MLB`,
    questions: `${API_PATH}/questions/search`
  }
}