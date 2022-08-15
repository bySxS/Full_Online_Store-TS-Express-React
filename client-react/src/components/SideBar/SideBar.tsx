import React from 'react'
import { Accordion } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import CategorySection from './CategorySection/CategorySection'
import st from './SideBar.module.scss'
import { useAuth } from 'hooks/useAuth'
import { useAppSelector } from '../../hooks/useStore'
import selectCategory from '../../store/category/category.selector'
import { useGetAllCategoryQuery } from '../../store/myStore/myStoreCategory.api'
import { useInfoLoading } from '../../hooks/useInfoLoading'
import Toggle from './toggle/toggle'

const SideBar = () => {
  const { isAuth } = useAuth()
  const { isLoading, isSuccess, isError, data, error } = useGetAllCategoryQuery('')
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const allCategory = useAppSelector(selectCategory.allCategory)

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
        {allCategory.length === 0
          ? <li>
          <NavLink to={RoutePath.PRODUCTS} className="sideBarLink">
              <i className={`bi bi-grid-fill ${st.icon}`}/>
              <span className={st.name_page}>Товары</span>
          </NavLink>
          </li>
          : <Accordion>
           <li>
            <Toggle eventKey="0">
              <i className={`bi bi-grid-fill ${st.icon}`}/>
              <span className={st.name_page}>Категории</span>
            </Toggle>
           </li>
            <Accordion.Collapse eventKey="0">
              <div className={'pl-3'}>
              {allCategory.map(category =>
                <CategorySection categorySection={category} key={category.sectionId}/>
              )}
              </div>
            </Accordion.Collapse>
           </Accordion>
        }
      </ul>
      </div>
    </div>
  )
}

export default SideBar
