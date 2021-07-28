import React, { createContext, useState, useContext } from "react"

import { 
  PricesMeanController,
  ResultMarketValueController,
  ResultValidURLController,
  ResultAcceptMercadoPagoController,
  ResultShippingModeController,
  ResultWarrantyTimeController,
  ResultTotalAnswersController,
  ResultCanceledTotalController
} from '../../controllers/ad-health'

import { SimilarProductsController, ProductSearchController } from '../../controllers/product'

import { SearchModel, QuestionModel } from '../../models'

const AdHealthProviderContext = createContext({})

const productSearchController = new ProductSearchController(new SearchModel())
const similarProductsController = new SimilarProductsController(productSearchController)
const resultMarketValueController = new ResultMarketValueController(new PricesMeanController())
const resultValidURLController = new ResultValidURLController()
const resultAcceptMercadoPagoController = new ResultAcceptMercadoPagoController()
const resultShippingModeController = new ResultShippingModeController()
const resultWarrantyTimeController = new ResultWarrantyTimeController()
const resultTotalAnswersController = new ResultTotalAnswersController(new QuestionModel())
const resultCanceledTotalController = new ResultCanceledTotalController()

const AdHealthProvider = ({ children, query }: any) => {
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(false)
  const [infoResults, setInfoResults] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState("")

  const makeVerifyResults = async (product: any, url: string) => {
    setLoadingSimilarProducts(true)
    setInfoResults([])
    setErrorMessage("")

    const responseSimilarProducts = await similarProductsController.getProductsByQueryString(
      product?.customData?.title
    )

    const results = [
      resultMarketValueController.get(product, responseSimilarProducts),
      resultValidURLController.get(url),
      resultAcceptMercadoPagoController.get(product),
      resultShippingModeController.get(product),
      resultWarrantyTimeController.get(product),
      await resultTotalAnswersController.get(product),
      resultCanceledTotalController.get(product, responseSimilarProducts),
    ]

    setInfoResults(results.filter((result: any) => result?.title))
    setLoadingSimilarProducts(false)
  }

  return (
    <AdHealthProviderContext.Provider
      value={{
        query,
        loadingSimilarProducts,
        makeVerifyResults,
        infoResults,
        errorMessage
      }}
    >
      {children}
    </AdHealthProviderContext.Provider>
  )
}

function useAdHealth() {
  const context = useContext(AdHealthProviderContext)

  if (!context) {
    throw new Error(
      "useIsItFraudProvider must be used within as AdHealthProviderContext"
    )
  }

  return context
}

export { AdHealthProvider, useAdHealth }
