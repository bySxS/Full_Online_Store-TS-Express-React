import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams, useNavigate } from 'react-router-dom'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import { useLazyGetProductByIdQuery } from 'store/myStore/myStoreProduct.api'
import selectBasket from 'store/basket/basket.selector'

export interface IDParams {
  [id: string]: string
}

const ProductDetails = () => {
  const { id: idParam } = useParams<IDParams>()
  const id = +(idParam || '')
  const navigate = useNavigate()
  const {
    addToBasket, delFromBasket
  } = useAppActions()
  useEffect(() => {
    if (!id || isNaN(+id)) {
      navigate(RoutePath.PRODUCTS)
      // addToAlertStack({
      //   message: 'ID должен быть с цифр',
      //   status: 'error'
      // })
    }
  }, [])

  const [fetchProductById, { isLoading, isSuccess, isError, data: product, error }] =
    useLazyGetProductByIdQuery()
  useInfoLoading({ isLoading, isSuccess, isError, data: product, error })
  const isFav = useAppSelector(selectBasket.productIsInBasket(id))

  const clickAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addToBasket(id)
  }

  const removeFromBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    delFromBasket(id)
  }

  useEffect(() => {
    if (id && !isNaN(id)) {
      fetchProductById(id)
    }
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
