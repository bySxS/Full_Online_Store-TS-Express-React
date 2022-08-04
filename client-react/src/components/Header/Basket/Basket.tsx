import React from 'react'
import { RoutePath } from 'AppRouter'
import { NavLink } from 'react-router-dom'
import style from './Basket.module.scss'

const Basket = () => {
  return (
    <div className={'pr-3.5'}>
      <NavLink className={style.basket_link}
               to={RoutePath.BASKET}>
          <i className="bi bi-cart-fill text-5xl text-gray-700"/>
      </NavLink>
    </div>
  )
}

export default Basket
