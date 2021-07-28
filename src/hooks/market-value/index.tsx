import React from 'react'

import { MarketValueProvider } from './MarketValueProvider'

function ComparatorAppProvider({ children, query }: any) {
  return (
    <MarketValueProvider query={query}>
      {children}
    </MarketValueProvider>
  )
}

export { ComparatorAppProvider }