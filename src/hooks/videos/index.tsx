import React from 'react'

import { VideosProvider } from './VideosProvider'

function VideosAppProvider({ children, query }: any) {
  return (
    <VideosProvider query={query}>
      {children}
    </VideosProvider>
  )
}

export { VideosAppProvider }