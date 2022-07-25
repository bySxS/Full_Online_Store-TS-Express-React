import { Request, Response, NextFunction } from 'express'
import { Auth } from './auth'
import ApiError from '@/apiError'
import { IJwt } from '@/users/token/token.interface'

export const RoleMiddleware = (roles: string[] | string) => {
  return function (req: Request, res: Response, next: NextFunction) {
    // try {
    if (!Auth(req)) {
      throw ApiError.UnauthorizedError('RoleMiddleware')
    }

    const jwtPayload = req.user as IJwt

    if (!jwtPayload) {
      throw ApiError.forbidden('Неверный ключ или токен',
        'RoleMiddleware')
    }

    const userRoles: string = jwtPayload.rolesName

    let needRoles: string[] = ['admin']// всегда даем права админу]
    const useRoles: string[] = [userRoles]

    if (typeof (roles) === 'object') {
      needRoles = [...needRoles, ...roles]
    } else {
      needRoles = [...needRoles, roles]
    }
    let hasRole = false
    useRoles.forEach(role => {
      if (needRoles.includes(role)) {
        hasRole = true
      }
    })

    if (!hasRole) {
      throw ApiError.forbidden(`У вас нет доступа к ${req.originalUrl}, вы '${jwtPayload.nickname}' в группе '${userRoles}', а нужна '${needRoles.join(', ')}'`,
        'RoleMiddleware')
    }
    next()
  }
}
