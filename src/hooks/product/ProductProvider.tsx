import React, { createContext, useState, useContext } from 'react'

import { serializeProduct } from '../../utils/serializeProduct'

import { ProductController } from '../../controllers/product'
import { ProductModel } from '../../models'

const ProductProviderContext = createContext({})

const productController = new ProductController(new ProductModel())

const ProductProvider = ({ children, query }:any) => {
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [product, setProduct] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState("")

  const makeProduct = async (url: string) => {
    setErrorMessage("")
    setLoadingProduct(true)
    setProduct([])
    
    try {
      const itemId = productController.getProductIdByUrl(url)
      const responseProduct = await productController.getProductById(itemId)

      setProduct(serializeProduct(responseProduct))
    } catch (e) {
      console.error(e)
      setErrorMessage(e.message)
    } finally {
      setLoadingProduct(false)
    }
  }

  return (
    <ProductProviderContext.Provider
      value={{
        query,
        product,
        makeProduct,
        loadingProduct,
        errorMessage
      }}
    >
      {children}
    </ProductProviderContext.Provider>
  )
}

function useProduct() {
  const context = useContext(ProductProviderContext)

  if (!context) {
    throw new Error(
      'useProductProvider must be used within as ProductProviderContext'
    )
  }

  return context
}

export { ProductProvider, useProduct }
