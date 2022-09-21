import React, { FC, useEffect } from 'react'
import { useAuth } from 'hooks/useSelectors'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useAppActions } from 'hooks/useStore'

export interface IRequireUser {
  allowedRoles?: string[] | string
  allowedUsers?: string[] | string
  allowedAuth?: boolean
}
interface IRequireUserProps {
  allow: IRequireUser
}

const AccessMiddleware: FC<IRequireUserProps> = ({ allow }) => {
  const { allowedUsers, allowedAuth, allowedRoles } = allow
  const location = useLocation()
  const { addToAlertStack } = useAppActions()
  const { nickname, isAuth, roles } = useAuth()
  let needRoles
  let needUsers

  const checkAuth: () => boolean = () => {
    return (allowedAuth !== undefined) && isAuth === allowedAuth
  }
  const checkRoles: () => boolean = () => {
    return !!((allowedRoles &&
      (typeof (allowedRoles) === 'object')
      ? (needRoles = [...allowedRoles])
      : (needRoles = [allowedRoles])) &&
      (isAuth && needRoles && needRoles.includes(roles)))
  }

  const checkUser: () => boolean = () => {
    return !!((allowedUsers &&
      (typeof (allowedUsers) === 'object')
      ? (needUsers = [...allowedUsers])
      : (needUsers = [allowedUsers])) &&
      (isAuth && needUsers && needUsers.includes(nickname)))
  }

  useEffect(() => {
    if (!(checkAuth() ||
        checkRoles() ||
        checkUser())) {
      addToAlertStack({
        message: 'У вас нет доступа к этой странице!',
        status: 'warning'
      })
    }
  }, [location.pathname, allow])

  return checkAuth()
    ? (<Outlet/>)
    : checkRoles()
      ? (<Outlet/>)
      : checkUser()
        ? (<Outlet/>)
        : (<Navigate to={RoutePath.HOME} state={{ from: location }} replace/>)
}

export default AccessMiddleware
