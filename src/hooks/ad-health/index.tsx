import React from 'react'

import { AdHealthProvider } from './AdHealthProvider'

function IsItFraudAppProvider({ children, query }: any) {
  return (
    <AdHealthProvider query={query}>
      {children}
    </AdHealthProvider>
  )
}

export { IsItFraudAppProvider }