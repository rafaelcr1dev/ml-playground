import MarketValueComponent from '../components/MarketValue'

import { MarketValueProvider } from '../hooks'
import { ProductProvider } from '../hooks'

export default function MarketValue() {
  return (
    <ProductProvider query={{}}>
      <MarketValueProvider query={{}}>
        <MarketValueComponent />
      </MarketValueProvider>
    </ProductProvider>
  )
}
