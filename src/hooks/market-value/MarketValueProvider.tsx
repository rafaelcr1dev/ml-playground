import React, { createContext, useState, useContext } from 'react'

import { SearchModel } from '../../models'

import { 
  SimilarProductsController, 
  ProductSearchController, 
} from '../../controllers/product'

const MarketValueProviderContext = createContext({})

const productSearchController = new ProductSearchController(new SearchModel())
const similarProductsController = new SimilarProductsController(productSearchController)

const MarketValueProvider = ({ children, query }:any) => {
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(false)
  const [similarProducts, setSimilarProducts] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState("")

  const makeSimilarProducts = async (productTarget: any) => {
    setLoadingSimilarProducts(true);
    setErrorMessage("");

    try {
      const responseSimilarProducts = await similarProductsController.getProductsBestPrice(productTarget)

      setSimilarProducts(responseSimilarProducts)
    } catch (e) {
      setErrorMessage(e.message)
    } finally {
      setLoadingSimilarProducts(false);
    }
  }

  return (
    <MarketValueProviderContext.Provider
      value={{
        query,
        loadingSimilarProducts,
        similarProducts,
        makeSimilarProducts,
        errorMessage
      }}
    >
      {children}
    </MarketValueProviderContext.Provider>
  )
}

function useMarketValue() {
  const context = useContext(MarketValueProviderContext)

  if (!context) {
    throw new Error(
      'useMarketValueProvider must be used within as MarketValueProviderContext'
    )
  }

  return context
}

export { MarketValueProvider, useMarketValue }
