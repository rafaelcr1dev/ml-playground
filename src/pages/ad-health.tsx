import AdHealthComponent from '../components/AdHealth'

import { AdHealthProvider } from '../hooks'
import { ProductProvider } from '../hooks'

export default function AdHealth() {
  return (
    <ProductProvider query={{}}>
      <AdHealthProvider query={{}}>
        <AdHealthComponent />
      </AdHealthProvider>  
    </ProductProvider>
  )
}
