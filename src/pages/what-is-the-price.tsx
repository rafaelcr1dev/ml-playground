import WhatsIsThePriceComponent from '../components/WhatsIsThePrice'

import { WhatIsThePriceProvider } from '../hooks'

export default function WhatIsThePrice() {
  return (
    <WhatIsThePriceProvider query={{}}>
      <WhatsIsThePriceComponent />
    </WhatIsThePriceProvider>
  )
}
