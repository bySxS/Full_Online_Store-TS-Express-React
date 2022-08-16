import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import { RouteName } from 'AppRouter'
import Basket from 'pages/Basket/Basket'
import style from './BasketIcon.module.scss'
import { ModalContext } from 'components/UI/Modal/ModalContext'

const BasketIcon = () => {
  const { modal, openModal, closeModal } = useContext(ModalContext)

  return (
    <div className={'pr-3.5'}>
      <Dropdown.Item
        className={style.basket_link}
        onClick={openModal}>
        <i className="bi bi-cart-fill text-5xl text-gray-700"/>
      </Dropdown.Item>
      {modal &&
       <ModalComponent show={modal}
                       title={'Корзина'}
                       onClose={closeModal}
       >
         <Basket name={RouteName.BASKET} />
       </ModalComponent>
      }
    </div>
  )
}

export default BasketIcon
