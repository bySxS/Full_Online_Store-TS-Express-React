import { NextFunction, Request, Response } from 'express'
import ApiError from '@/apiError'
import { validationResult } from 'express-validator'

export const ValidatorResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errorsValid = validationResult(req).array()
  if (errorsValid.length > 0) {
    throw ApiError.badRequest(
      'Ошибка: ' +
        errorsValid.map((value) => value.msg).join(', '),
      req.method + ' ' + req.path)
  }
  next()
}
