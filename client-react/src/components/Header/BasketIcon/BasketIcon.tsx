import React, { useState } from 'react'
import { NavLink } from 'react-bootstrap'
import { ModalComponent } from 'components/UI/Modal/ModalComponent'
import { RouteName } from 'AppRouter'
import Basket from 'pages/Basket/Basket'
import style from './BasketIcon.module.scss'
// import { ModalContext } from 'components/UI/Modal/ModalContext'

const BasketIcon = () => {
  // const { modal, openModal, closeModal } = useContext(ModalContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className={'pr-3.5'}>
      <NavLink
        className={style.basket_link}
        onClick={handleShow}>
        <i className="bi bi-cart-fill text-5xl text-gray-700"/>
      </NavLink>
      {show &&
       <ModalComponent show={show}
                       title={'Корзина'}
                       onClose={handleClose}
       >
         <Basket name={RouteName.BASKET} />
       </ModalComponent>
      }
    </div>
  )
}

export default BasketIcon
