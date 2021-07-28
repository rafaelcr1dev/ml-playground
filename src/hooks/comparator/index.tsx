import React from 'react'

import { ComparatorProvider } from './ComparatorProvider'

function ComparatorAppProvider({ children, query }: any) {
  return (
    <ComparatorProvider query={query}>
      {children}
    </ComparatorProvider>
  )
}

export { ComparatorAppProvider }