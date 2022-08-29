import React, { useEffect } from 'react'
import { NavLink } from 'react-bootstrap'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import { RouteName } from 'AppRouter'
import Basket from 'pages/Basket/Basket'
import { useAppSelector } from 'hooks/useStore'
import selectBasket from 'store/basket/basket.selector'
import { useModal } from 'context/ModalContext'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useSyncBasketMutation } from 'store/myStore/myStoreBasket.api'
import { useAuth } from 'hooks/useSelectors'
import style from './BasketIcon.module.scss'

const BasketIcon = () => {
  const { modal, openModal, closeModal } = useModal()
  const { isAuth } = useAuth()
  const basketProduct = useAppSelector(selectBasket.basketProduct)
  const countProductInBasket = useAppSelector(selectBasket.countProductInBasket)
  const needSyncBasket = useAppSelector(selectBasket.needSyncBasket)
  const [syncBasket, {
    isLoading, isSuccess, isError, error, data
  }] = useSyncBasketMutation()
  useInfoLoading({
    isLoading, isSuccess, isError, error, data
  })
  useEffect(() => {
    if (isAuth && !needSyncBasket) {
      syncBasket({ productsInBasket: basketProduct })
    }
  }, [isAuth])

  const clickOpenBasketModal = () => {
    if (modal[0]) {
      closeModal(0)
    } else {
      openModal(0)
    }
  }

  return (
    <>
    <div className={'pr-3.5 w-[55px]'}>
      {countProductInBasket > 0 &&
      <div
        onClick={clickOpenBasketModal}
        className={style.count}
      >
        {countProductInBasket}
      </div>
      }
      <NavLink
        className={style.basketLink}
        onClick={clickOpenBasketModal}
      >
        <i className="bi bi-cart-fill text-5xl text-gray-700"/>
      </NavLink>
    </div>
      {modal &&
       <ModalComponent show={modal[0]}
                       title={'Корзина'}
                       onClose={() => closeModal(0)}
                       className={'w-[1000px]'}
       >
         <Basket name={RouteName.BASKET} />
       </ModalComponent>
      }
    </>
  )
}

export default BasketIcon
