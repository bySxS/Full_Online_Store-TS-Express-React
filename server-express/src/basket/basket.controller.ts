import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import BasketService from './basket.service'
import { IBasketController } from '@/basket/basket.interface'
import { IJwt } from '@/users/token/token.interface'
import { validationResult } from 'express-validator'

class BasketController implements IBasketController {
  private static instance = new BasketController()

  static getInstance (): BasketController { // паттерн singleton одиночка
    if (!BasketController.instance) {
      BasketController.instance = new BasketController()
    }
    return BasketController.instance
  }

  async addProductToBasket (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const authUser = req.user as IJwt
      const result =
        await BasketService.addProductToBasket(authUser.id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delProductFromBasket (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'BasketController delProductFromBasket'))
      }
      const id = +req.params.id
      const result =
        await BasketService.delProductFromBasket(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllOrdersByUserId (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'BasketController getAllOrdersByUserId'))
      }
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const authUser = req.user as IJwt
      const result = await BasketService.getAllOrdersByUserId(authUser.id, limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getCurrentBasketByAuthUser (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const authUser = req.user as IJwt
      const result = await BasketService.getCurrentBasketByUserId(authUser.id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllOrdersInProgressAllUsers (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const errorsValid = validationResult(req).array()
      if (errorsValid.length > 0) {
        return next(ApiError.badRequest(
          'Ошибка: ' +
          errorsValid.map((value) => value.msg).join(', '),
          'BasketController getAllOrdersInProgressAllUsers'))
      }
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const result = await BasketService.getAllOrdersInProgressAllUsers(limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default BasketController.getInstance()
