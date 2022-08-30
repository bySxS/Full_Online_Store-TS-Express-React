import React, { FC, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import ProductListBasket from 'components/ProductListBasket/ProductListBasket'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useChangeCountProductInBasketMutation,
  useDelFromBasketMutation,
  useLazyGetBasketQuery,
  useGetProductBasketNoneAuthUserMutation
} from 'store/myStore/myStoreBasket.api'
import { useAuth, useBasket } from 'hooks/useSelectors'
import BasketForm from 'components/BasketForm/BasketForm'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectBasket from 'store/basket/basket.selector'
import style from './Basket.module.scss'

interface BasketProps {
  name: string
}

const Basket: FC<BasketProps> = ({ name }) => {
  const { isAuth } = useAuth()
  const [showBuying, setShowBuying] = useState(false)
  const [getProductAuth, {
    isLoading, isSuccess, isError, data, error
  }] = useLazyGetBasketQuery()
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const [getProductNoneAuth, {
    isLoading: isLoadingGet, isSuccess: isSuccessGet,
    isError: isErrorGet, data: dataGet, error: errorGet
  }] = useGetProductBasketNoneAuthUserMutation()
  useInfoLoading({
    isLoading: isLoadingGet,
    isSuccess: isSuccessGet,
    isError: isErrorGet,
    data: dataGet,
    error: errorGet
  })
  const [delProductFromBasket, {
    isLoading: isLoadingDel, isSuccess: isSuccessDel,
    isError: isErrorDel, data: dataDel, error: errorDel
  }] = useDelFromBasketMutation()
  useInfoLoading({
    isLoading: isLoadingDel,
    isSuccess: isSuccessDel,
    isError: isErrorDel,
    data: dataDel,
    error: errorDel
  })
  const [updCountProductFromBasket, {
    isLoading: isLoadingUpdCount, isSuccess: isSuccessUpdCount,
    isError: isErrorUpdCount, data: dataUpdCount, error: errorUpdCount
  }] = useChangeCountProductInBasketMutation()
  useInfoLoading({
    isLoading: isLoadingUpdCount,
    isSuccess: isSuccessUpdCount,
    isError: isErrorUpdCount,
    data: dataUpdCount,
    error: errorUpdCount
  })
  const { changeCountProduct, delFromBasket } = useAppActions()
  const basketProduct = useAppSelector(selectBasket.basketProduct)
  const { basketProductFullInfo, basketPrice } = useBasket()

  const clickDelete = (productId: number, title: string) => {
    const result = confirm('Вы уверены что хотите удалить из корзины ' +
                           title + '?')
    if (result) {
      if (isAuth) {
        delProductFromBasket(productId)
      } else {
        delFromBasket(productId)
      }
    }
  }

  const changeCountPrice = (productId: number, productCount: number) => {
    if (isAuth) {
      updCountProductFromBasket({ productId, productCount })
    } else {
      changeCountProduct({ productId, productCount })
    }
  }

  useEffect(() => {
    if (isAuth) {
      getProductAuth('')
    } else {
      getProductNoneAuth({ productsInBasket: basketProduct })
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div>
      {basketProductFullInfo && basketProductFullInfo.length > 0 &&
        (<ProductListBasket
          InBasket={true}
          productSmall={basketProductFullInfo}
          onDelete={clickDelete}
          onChangeCount={changeCountPrice}
        />)
      }
      {basketPrice > 0 && (
       <div className={style.block}>
       <div className={style.blockPrice}>
         Сумма товаров с учетом количества: {basketPrice}₴
       </div>
         {!showBuying &&
           <div className={style.blockButton}>
         <Button
           variant={'outline-warning'}
           className={style.button}
           onClick={() => setShowBuying(!showBuying)}
         >
           {!showBuying
             ? 'Оформить покупку'
             : 'Отменить'
           }
         </Button>
       </div>
         }
       </div>
      )}
        {showBuying &&
          (isAuth
            ? (<BasketForm />)
            : (<div className={'text-center'}>
              Чтобы оформить покупку нужно авторизироваться!
            </div>))
        }
    </div>
    </>
  )
}

export default Basket
