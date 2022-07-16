import { Request, Response, NextFunction } from 'express'
import ApiError from '../apiError'
import TokenService from '../users/token/token.service'

export const Auth = (req: Request): boolean => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return false
    }
    const accessToken: string = authorizationHeader.split(' ')[1] || ''
    if (accessToken === '') {
      return false
    }
    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return false
    }
    req.user = userData
    return true
  } catch (e) {
    return false
  }
}

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  if (!Auth(req)) {
    throw ApiError.UnauthorizedError('AuthMiddleware')
  }
  next()
}
