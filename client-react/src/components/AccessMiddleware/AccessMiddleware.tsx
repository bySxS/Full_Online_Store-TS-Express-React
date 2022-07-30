import React, { FC, useEffect } from 'react'
import { useAuth } from 'hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useAppActions, useAppDispatch } from 'hooks/useStore'

export interface IRequireUser {
  allowedRoles?: string[] | string
  allowedUsers?: string[] | string
  allowedAuth?: boolean
}
interface IRequireUserProps {
  allow: IRequireUser
}

const AccessMiddleware: FC<IRequireUserProps> = ({ allow }) => {
  const location = useLocation()
  const { addToAlertStack } = useAppActions()
  const dispatch = useAppDispatch()
  const { user, auth: isAuth, roles } = useAuth()
  let needRoles
  let needUsers

  const checkAuth: () => boolean = () => {
    return (allow.allowedAuth !== undefined) && isAuth === allow.allowedAuth
  }
  const checkRoles: () => boolean = () => {
    return !!((allow.allowedRoles &&
      (typeof (allow.allowedRoles) === 'object')
      ? (needRoles = [...allow.allowedRoles])
      : (needRoles = [allow.allowedRoles])) &&
      (isAuth && needRoles && needRoles.includes(roles)))
  }

  const checkUser: () => boolean = () => {
    return !!((allow.allowedUsers &&
      (typeof (allow.allowedUsers) === 'object')
      ? (needUsers = [...allow.allowedUsers])
      : (needUsers = [allow.allowedUsers])) &&
      (isAuth && user?.nickname &&
        needUsers && needUsers.includes(user.nickname)))
  }

  useEffect(() => {
    if (!(checkAuth() ||
        checkRoles() ||
        checkUser())) {
      dispatch(addToAlertStack({
        message: 'У вас нет доступа к этой странице!',
        status: 'warning'
      }))
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
