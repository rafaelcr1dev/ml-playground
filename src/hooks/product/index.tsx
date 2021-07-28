import React from 'react'

import { ProductProvider } from './ProductProvider'

function ComparatorAppProvider({ children, query }: any) {
  return (
    <ProductProvider query={query}>
      {children}
    </ProductProvider>
  )
}

export { ComparatorAppProvider }