import React, { createContext, useState, useContext } from 'react'

import RandomProductCategoryController from '../../controllers/what-is-the-price/RandomProductCategoryController'
import { ProductCategoryModel } from '../../models'

const WhatIsThePriceProviderContext = createContext({})

const randomProductCategoryController = new RandomProductCategoryController(new ProductCategoryModel())

const WhatIsThePriceProvider = ({ children, query }:any) => {
  const [loadingWhatIsThePrice, setLoadingWhatIsThePrice] = useState(false)
  const [product, setProduct] = useState<any>({})
  const [results, setResults] = useState<any>({})
  const [randomCategory, setRandomCategory] = useState<any>({})
  const [errorMessage, setErrorMessage] = useState("")

  const makeWhatIsThePrice = async () => {
    setErrorMessage("")
    setLoadingWhatIsThePrice(true)

    try {
      const { product, category } = await randomProductCategoryController.select()
      setProduct(product)
      setRandomCategory(category)
    } catch (e) {
      setErrorMessage(e.message)
    } finally {
      setLoadingWhatIsThePrice(false)
    }
  }

  const makeResults = (value: string) => {
    if (parseFloat(product.price) == parseFloat(value)) {
      setResults({
        ...randomCategory,
        error: false,
        finished: true
      })
      return
    }

    setResults({
      error: true,
      finished: true
    })
  }

  return (
    <WhatIsThePriceProviderContext.Provider
      value={{
        query,
        loadingWhatIsThePrice,
        product,
        makeWhatIsThePrice,
        results,
        makeResults,
        setLoadingWhatIsThePrice,
        errorMessage
      }}
    >
      {children}
    </WhatIsThePriceProviderContext.Provider>
  )
}

function useWhatIsThePrice() {
  const context = useContext(WhatIsThePriceProviderContext)

  if (!context) {
    throw new Error(
      'useWhatIsThePriceProvider must be used within as WhatIsThePriceProviderContext'
    )
  }

  return context
}

export { WhatIsThePriceProvider, useWhatIsThePrice }
