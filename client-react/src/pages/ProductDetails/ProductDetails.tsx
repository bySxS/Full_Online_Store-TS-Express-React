import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useNavigate } from 'react-router-dom'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import { useLazyGetProductByIdQuery } from 'store/myStore/myStoreProduct.api'

interface ProductDetailsParams {
  [id: string]: string
}

const ProductDetails = () => {
  const { id } = useParams<ProductDetailsParams>()
  const navigate = useNavigate()
  const {
    addToBasket, delFromBasket, addToAlertStack
  } = useAppActions()
  if (!id || isNaN(+id)) {
    navigate(RoutePath.PRODUCTS)
    addToAlertStack({
      message: 'ID должен быть с цифр',
      status: 'error'
    })
    return (<></>)
  }
  const [fetchProductById, { isLoading, isSuccess, isError, data: product, error }] =
    useLazyGetProductByIdQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data: product, error })
  const { basket } = useAppSelector(state => state)
  const [isFav, setIsFav] = useState(basket.product.includes(+id))

  const clickAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addToBasket(+id)
    setIsFav(true)
  }

  const removeFromBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    delFromBasket(+id)
    setIsFav(false)
  }

  useEffect(() => {
    fetchProductById(+id)
  }, [id])

  return (
    <div>
      {isSuccess && product &&
        <div>
        <Helmet>
          <title>{product.result.title}</title>
          <meta name="description" content={product.result.title}/>
        </Helmet>
        <div className="font-bold">{product.result.title}</div>
          <div className="flex-column">
            <div className="p-2 border-1 shadow-md my-3">
              1 колонка
              {!isFav && <button
                className="py-2 px-4 mr-2 bg-yellow-400 rounded hover:shadow-md transition-all"
                onClick={clickAddToBasket}
              >
                Добавить в корзину
              </button>}
              {isFav && <button
                className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
                onClick={removeFromBasket}
              >
                Удалить из корзины
              </button>}
            </div>
            <div className="p-2 border-1 shadow-md my-3">
              2 колонка
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductDetails
