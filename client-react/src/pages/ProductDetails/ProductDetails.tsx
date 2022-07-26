import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useLazyGetProductByIdQuery } from 'store/myStore/myStore.api'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from 'components/UI/Loader/Loader'
import { useErrorFix } from 'hooks/useErrorFix'
import { RoutePath } from 'AppRouter'
import Alarm from 'components/UI/Alarm/Alarm'
import { useAppActions, useAppSelector } from 'hooks/useStore'

interface ProductDetailsParams {
  [id: string]: string
}

const ProductDetails = () => {
  const { id } = useParams<ProductDetailsParams>()
  const navigate = useNavigate()
  if (!id || isNaN(+id)) {
    navigate(RoutePath.PRODUCTS)
    return (<Alarm message={'ID должен быть с цифр'} title={'Ошибка'} status={'error'} />)
  }
  const [fetchProductById, { isLoading, isSuccess, isError, data: product, error }] =
    useLazyGetProductByIdQuery()
  const err = useErrorFix(isError, error)
  const { basket } = useAppSelector(state => state)
  const [isFav, setIsFav] = useState(basket.product.includes(+id))
  const { addToBasket, delFromBasket } = useAppActions()

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
    <div className={'body'}>
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
      {isLoading && <Loader/>}
      {isSuccess && product && <Alarm message={product.message} />}
      {isError && err && <Alarm message={err} status={'error'} />}
    </div>
  )
}

export default ProductDetails
