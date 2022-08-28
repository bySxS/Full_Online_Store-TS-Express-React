import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { useModal } from 'context/ModalContext'
import { useAuth } from 'hooks/useSelectors'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectBasket from 'store/basket/basket.selector'
import { useAddToBasketMutation } from 'store/myStore/myStoreBasket.api'

interface IBasketProps {
  productId: number
}

const ButtonBasket: FC<IBasketProps> = ({ productId }) => {
  const { addToBasket } = useAppActions()
  const { modal, openModal, closeModal } = useModal()
  const { isAuth } = useAuth()
  const [addInBasket, {
    isLoading: isLoadingAdd, isSuccess: isSuccessAdd, isError: isErrorAdd, data: dataAdd, error: errorAdd
  }] = useAddToBasketMutation()
  useInfoLoading({
    isLoading: isLoadingAdd, isSuccess: isSuccessAdd, isError: isErrorAdd, data: dataAdd, error: errorAdd
  })
  const isInBasket = useAppSelector(selectBasket.productIsInBasket(productId))
  const clickAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (isAuth) {
      addInBasket({
        productId,
        productCount: 1
      })
    } else {
      addToBasket({
        productId,
        productCount: 1
      })
    }
  }
  //
  const clickOpenBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // delFromBasket(product.id)
    if (modal[0]) {
      closeModal(0)
    } else {
      openModal(0)
    }
  }
  return (
    <>
      {!isInBasket
        ? <Button
          onClick={clickAddToBasket}
          className={'bg-success hover:opacity-80'}
          variant={'success'}
        >
          Купить
        </Button>
        : <Button
          className={'text-black underline hover:text-red-600'}
          variant={'outline-light'}
          onClick={clickOpenBasket}
        >
          <i className="bi bi-cart-check-fill text-green-500"/> Продукт в корзине
        </Button>
      }
    </>
  )
}

export default ButtonBasket
