import React, { createContext, useState, useContext, useCallback } from 'react'

import { serializeProduct } from '../../utils/serializeProduct'

import { ProductModel } from '../../models'
import { ProductController } from '../../controllers/product'

const ComparatorProviderContext = createContext({})

const productController = new ProductController(new ProductModel())

const ComparatorProvider = ({ children, query }:any) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<any>([])
  const [errorMessage, setErrorMessage] = useState("")

  const makeProducts = async (url: string) => {
    setErrorMessage("")
    setLoading(true)
    setProducts([])
    
    try {
      const itemId = productController.getProductIdByUrl(url)
      const responseProduct = await productController.getProductById(itemId)
      const currentProducts = Object.assign([], products)

      currentProducts.push(serializeProduct(responseProduct))

      setProducts(currentProducts)
    } catch (e) {
      console.error(e)
      setErrorMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = useCallback((position: number) => {
    const currentProducts:any = Object.assign([], products)
    currentProducts.splice(position, 1)

    setProducts(currentProducts)
  }, [products])

  return (
    <ComparatorProviderContext.Provider
      value={{
        query,
        loading,
        products,
        makeProducts,
        onDelete,
        errorMessage
      }}
    >
      {children}
    </ComparatorProviderContext.Provider>
  )
}

function useComparator() {
  const context = useContext(ComparatorProviderContext)

  if (!context) {
    throw new Error(
      'useComparatorProvider must be used within as ComparatorProviderContext'
    )
  }

  return context
}

export { ComparatorProvider, useComparator }
