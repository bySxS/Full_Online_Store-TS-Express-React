import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { RouteName, RoutePath } from 'AppRouter'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import style from './AdminPanel.module.scss'

interface AdminPanelProps {
  name: string
}

const AdminPanel: FC<AdminPanelProps> = ({ name }) => {
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className={style.block}>
        <div className={style.blockCategory}>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_CATEGORY}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_CATEGORY}
          </NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_USERS}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_USERS}
          </NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_CHARACTERISTICS}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_CHARACTERISTICS}
          </NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_TYPE_PRICE}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_TYPE_PRICE}
          </NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_PRODUCTS}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_PRODUCTS}
          </NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink className={style.link} to={RoutePath.EDIT_ORDERS}>
            <i className="bi bi-people-fill text-2xl pr-1.5"/>
            {RouteName.EDIT_ORDERS}
          </NavLink>
        </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanel
