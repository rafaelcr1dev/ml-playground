import React from 'react'

import { WhatIsThePriceProvider } from './WhatIsThePriceProvider'

function WhatIsThePriceAppProvider({ children, query }: any) {
  return (
    <WhatIsThePriceProvider query={query}>
      {children}
    </WhatIsThePriceProvider>
  )
}

export { WhatIsThePriceAppProvider }