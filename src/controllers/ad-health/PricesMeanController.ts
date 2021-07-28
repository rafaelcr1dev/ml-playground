export class PricesMeanController {
  get (values: number[], percentBase: number) {
    const values_sort = values.sort((a, b) => a - b)
    const qtd_numbers_to_remove = (values_sort.length * percentBase) / 100
    const rest_values = values.slice(
      qtd_numbers_to_remove,
      values.length - qtd_numbers_to_remove
    )
    const total = rest_values.reduce((current, prev) => {
      return current + prev
    }, 0)
    const mean = total / rest_values.length
  
    return parseFloat(mean.toFixed(2))
  }
}