import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import ProductListSmall from 'components/ProductListSmall/ProductListSmall'
import { useInfoLoading } from 'hooks/useInfoLoading'
import {
  useChangeCountProductInBasketMutation, useDelFromBasketMutation, useGetBasketQuery
} from 'store/myStore/myStoreBasket.api'
import { useBasket } from 'hooks/useSelectors'
import style from './Basket.module.scss'

interface BasketProps {
  name: string
}

const Basket: FC<BasketProps> = ({ name }) => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetBasketQuery('')
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
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
  const { basketProductFullInfo, basketPrice } = useBasket()
  const clickDelete = (id: number, title: string) => {
    const result = confirm('Вы уверены что хотите удалить из корзины ' +
                           title + '?')
    if (result) {
      delProductFromBasket(id)
    }
  }

  const changeCountPrice = (productId: number, productCount: number) => {
    updCountProductFromBasket({ productId, productCount })
  }

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      {basketProductFullInfo
        ? (<ProductListSmall
          InBasket={true}
          productSmall={basketProductFullInfo}
          onDelete={clickDelete}
          onChangeCount={changeCountPrice}
        />)
        : (<div>Нет продуктов в корзине</div>)
      }
      {basketPrice > 0 && (
       <div className={style.block}>
       <div className={style.blockPrice}>
         Сумма товаров с учетом количества: {basketPrice}₴
       </div>
       <div className={style.blockButton}>
         <Button
           variant={'outline-warning'}
           className={style.button}
         >
           Оформить покупку
         </Button>
       </div>
       </div>
      )}
    </div>
  )
}

export default Basket
