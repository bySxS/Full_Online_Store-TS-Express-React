import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import st from './SideBar.module.scss'
import { useAuth } from 'hooks/useAuth'

const SideBar = () => {
  const { isAuth } = useAuth()

  return (
    <div className={st.sideMenuHead}>
      <div className={st.sideMenuBody}>
      <ul>
        <li>
          <NavLink to={RoutePath.HOME} className="sideBarLink">
              <i className={`bi bi-house-fill ${st.icon}`}/>
              <span className={st.name_page}>Главная</span>
          </NavLink>
        </li>
        {isAuth &&
          <li>
            <NavLink to={RoutePath.FAVORITES_PRODUCT} className="sideBarLink">
                <i className={`bi bi-bookmark-fill ${st.icon}`}/>
                <span className={st.name_page}>Избранные товары</span>
            </NavLink>
          </li>
        }
        <li>
          <NavLink to={RoutePath.PRODUCTS} className="sideBarLink">
              <i className={`bi bi-grid-fill ${st.icon}`}/>
              <span className={st.name_page}>Товары</span>
          </NavLink>
        </li>
      </ul>
      </div>
    </div>
  )
}

export default SideBar
