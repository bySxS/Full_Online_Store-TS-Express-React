import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import selectUser from 'store/user/user.selector'
import { useGetFavProductsListQuery } from 'store/myStore/myStoreFavProduct.api'
import selectProduct from 'store/product/product.selector'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import CategorySection from '../CategorySection/CategorySection'
import st from './SideBar.module.scss'
import { useAuth, useProducts } from 'hooks/useSelectors'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectCategory from 'store/category/category.selector'
import { useGetAllCategoryQuery } from 'store/myStore/myStoreCategory.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import Toggle from '../UI/Toggle/Toggle'

const SideBar = () => {
  const { isAuth } = useAuth()
  const { pathname } = useLocation()
  const [show, setShow] = useState<number[]>([])
  // const params = useParams()
  const navigate = useNavigate()
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  const menuShow = useAppSelector(selectUser.menuShow)
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetAllCategoryQuery('')
  useInfoLoading({
    isLoading, isSuccess, isError, data, error
  })
  const {
    isLoading: isLoadingListFav,
    isSuccess: isSuccessListFav,
    isError: isErrorListFav,
    data: listFav,
    error: errorListFav
  } =
    useGetFavProductsListQuery('', {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      skip: !isAuth
    })
  useInfoLoading({
    isLoading: isLoadingListFav,
    isSuccess: isSuccessListFav,
    isError: isErrorListFav,
    data: listFav,
    error: errorListFav
  })
  const { setShowCategory } = useAppActions()
  const countFavProduct = useAppSelector(selectProduct.countFavProducts)
  const allCategory = useAppSelector(selectCategory.allCategory)
  const handleFocus = () => {
    setShowCategory([])
  }
  const { showCategory } = useProducts()
  useEffect(() => {
    setShow([])
  }, [showCategory])

  const clickGoToPage = () => {
    navigate(RoutePath.PRODUCTS)
    changeFilterState({
      categoryId: undefined
    })
    setBreadcrumb({
      moduleName: 'Товары',
      moduleLink: '/products'
    })
  }

  return (
    menuShow
      ? <div onClick={handleFocus} className={st.sideMenuHead}>
      <div className={st.sideMenuBody}>
      <ul>
        <li>
          <NavLink
            to={RoutePath.HOME}
            className="sideBarLink"
            onMouseEnter={handleFocus}
          >
            <i className={`bi bi-house-fill ${st.icon}`}/>
            <span className={st.name_page}>Главная</span>
          </NavLink>
        </li>
        {isAuth &&
          <li>
            <NavLink
              to={RoutePath.FAVORITES_PRODUCT}
              onClick={() => changeFilterState({
                categoryId: undefined
              })}
              className="sideBarLink"
              onMouseEnter={handleFocus}
            >
              <i className={`bi bi-bookmark-fill ${st.icon}`}/>
              <span className={st.name_page}>Избранные товары ({countFavProduct})</span>
            </NavLink>
          </li>
        }
        {allCategory && allCategory.length === 0
          ? <li>
          <NavLink
            to={RoutePath.PRODUCTS}
            onClick={clickGoToPage}
            className="sideBarLink"
            onMouseEnter={handleFocus}
          >
            <i className={`bi bi-grid-fill ${st.icon}`}/>
            <span className={st.name_page}>Товары</span>
          </NavLink>
          </li>
          : <Accordion>
           <li>
            <Toggle
              eventKey="0"
              className={'sideBarLink'}
              onMouseEnter={handleFocus}
            >
              <i className={`bi bi-grid-fill ${st.icon}`}/>
              <span className={st.name_page}>Категории</span>
            </Toggle>
           </li>
            <Accordion.Collapse eventKey="0">
              <div className={'pl-3'}>
                <li>
                  <NavLink
                    onClick={clickGoToPage}
                    to={RoutePath.PRODUCTS}
                    className={({ isActive }) => (
                      isActive &&
                      pathname === RoutePath.PRODUCTS
                        ? 'sideBarLink active pl-[10px]'
                        : 'sideBarLink pl-[10px]'
                    )}
                    onMouseEnter={handleFocus}
                  >
                    <i className={`bi bi-grid-3x3-gap-fill ${st.icon}`}/>
                    <span className={st.name_page}>Все товары</span>
                  </NavLink>
                </li>
              {allCategory?.map(category =>
                <CategorySection
                  categorySection={category}
                  key={category.sectionId}
                  show={show}
                  setShow={setShow}
                />
              )}
              </div>
            </Accordion.Collapse>
           </Accordion>
        }
      </ul>
      </div>
    </div>
      : <></>
  )
}

export default SideBar
