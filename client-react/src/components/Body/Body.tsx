import React from 'react'
import AppRouter from 'AppRouter'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectUser from 'store/user/user.selector'
import style from 'styles/App.module.scss'
import { Breadcrumbs } from '../Breadcrumb/Breadcrumb'

const Body = () => {
  const menuShow = useAppSelector(selectUser.menuShow)
  const { setShowCategory } = useAppActions()
  const handleClick = () => {
    setShowCategory([])
  }

  return (
    <div
      className={`body ${menuShow
        ? 'paddingLeftShowMenu'
        : 'paddingLeftHideMenu'
      }`}
      onClick={handleClick}
    >
      <div className={style.body_content}>
        <Breadcrumbs />
        <AppRouter />
      </div>
    </div>
  )
}

export default Body
