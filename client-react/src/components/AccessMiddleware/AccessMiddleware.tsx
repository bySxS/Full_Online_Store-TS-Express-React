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

  useEffect(() => {
    let needRoles
    let needUsers
    if (allow.allowedRoles) {
      if (typeof (allow.allowedRoles) === 'object') {
        needRoles = [...allow.allowedRoles]
      } else {
        needRoles = [allow.allowedRoles]
      }
    }
    if (allow.allowedUsers) {
      if (typeof (allow.allowedUsers) === 'object') {
        needUsers = [...allow.allowedUsers]
      } else {
        needUsers = [allow.allowedUsers]
      }
    }
    if (
      !(((allow.allowedAuth !== undefined) && isAuth === allow.allowedAuth) ||
        (isAuth && needRoles && needRoles.includes(roles)) ||
        (isAuth && user?.nickname && needUsers && needUsers.includes(user.nickname)))
    ) {
      dispatch(addToAlertStack({
        message: 'У вас нет доступа к этой странице!',
        status: 'warning'
      }))
    }
  }, [location.pathname, allow])

  // пришлось без стейтов
  return ((allow.allowedAuth !== undefined) && isAuth === allow.allowedAuth)
    ? (<Outlet/>)
    : (allow.allowedRoles &&
  (typeof (allow.allowedRoles) === 'object')
        ? (needRoles = [...allow.allowedRoles])
        : (needRoles = [allow.allowedRoles])) &&
  (isAuth && needRoles && needRoles.includes(roles))
        ? (<Outlet/>)
        : (allow.allowedUsers &&
    (typeof (allow.allowedUsers) === 'object')
            ? (needUsers = [...allow.allowedUsers])
            : (needUsers = [allow.allowedUsers])) &&
    (isAuth && user?.nickname && needUsers && needUsers.includes(user.nickname))
            ? (<Outlet/>)
            : (<Navigate to={RoutePath.HOME} state={{ from: location }} replace/>)
}

export default AccessMiddleware
