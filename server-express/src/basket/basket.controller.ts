import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import BasketService from './basket.service'
import { IBasketController } from '@/basket/basket.interface'
import { IJwt } from '@/users/token/token.interface'

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
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'BasketController del'))
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
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      const authUser = req.user as IJwt
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'BasketController getAllOrdersByUserId'))
      }
      const result = await BasketService.getAllOrdersByUserId(authUser.id, limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getCurrentBasketByUserId (
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
      const limit = +(req.query.limit || 20)
      const page = +(req.query.page || 1)
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'BasketController getAllOrdersInProgressAllUsers'))
      }
      const result = await BasketService.getAllOrdersInProgressAllUsers(limit, page)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default BasketController.getInstance()
