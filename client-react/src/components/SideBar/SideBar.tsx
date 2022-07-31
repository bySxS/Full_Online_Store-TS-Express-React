import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import st from './SideBar.module.scss'
import { useAuth } from 'hooks/useAuth'

const SideBar = () => {
  const { isAuth, isAdmin } = useAuth()

  return (
    <div className={`d-flex flex-column flex-shrink-0 bg-light text-gray-600 ${st.sideMenu}`}>
      <ul className="nav nav-pills nav-flush flex-column mb-auto">
        <li className="nav-item">
          <NavLink to={RoutePath.HOME} className="nav-link link-dark py-3 border-bottom rounded-0">
            <div className={st.link_flex}>
              <div><i className="bi bi-house-fill text-2xl pr-1.5"></i></div>
              <div className={st.name_page}>Главная</div>
            </div>
          </NavLink>
        </li>
        {isAuth &&
          <li className="nav-item">
            <NavLink to={RoutePath.FAVORITES_PRODUCT} className="nav-link link-dark py-3 border-bottom rounded-0">
              <div className={st.link_flex}>
                <div><i className="bi bi-bookmark-fill text-2xl pr-1.5"></i></div>
                <div className={st.name_page}>Избранные товары</div>
              </div>
            </NavLink>
          </li>
        }
        <li className="nav-item">
          <NavLink to={RoutePath.PRODUCTS} className="nav-link link-dark py-3 border-bottom rounded-0">
            <div className={st.link_flex}>
              <div><i className="bi bi-grid-fill text-2xl pr-1.5"></i></div>
              <div className={st.name_page}>Товары</div>
            </div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={RoutePath.BASKET} className="nav-link link-dark py-3 border-bottom rounded-0">
            <div className={st.link_flex}>
              <div><i className="bi bi-cart-fill text-2xl pr-1.5"></i></div>
              <div className={st.name_page}>Корзина</div>
            </div>
          </NavLink>
        </li>
        {isAuth &&
          <li className="nav-item">
          <NavLink to={RoutePath.ALL_ORDERS} className="nav-link link-dark py-3 border-bottom rounded-0">
            <div className={st.link_flex}>
              <div><i className="bi bi-card-list text-2xl pr-1.5"></i></div>
              <div className={st.name_page}>Все заказы</div>
            </div>
          </NavLink>
        </li>
        }
        {isAdmin &&
        <li className="nav-item">
          <NavLink to={RoutePath.USERS} className="nav-link link-dark py-3 border-bottom rounded-0">
            <div className={st.link_flex}>
              <div><i className="bi bi-people-fill text-2xl pr-1.5"></i></div>
              <div className={st.name_page}>Пользователи</div>
            </div>
          </NavLink>
        </li>
        }
      </ul>
    </div>
  )
}

export default SideBar
