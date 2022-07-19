import { IFavoritesProductController } from './favoritesProducts.interface'
import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import FavoritesProductsService from '@/products/favorites/favoritesProducts.service'

class FavoritesProductController implements IFavoritesProductController {
  private static instance = new FavoritesProductController()

  static getInstance (): FavoritesProductController { // паттерн singleton одиночка
    if (!FavoritesProductController.instance) {
      FavoritesProductController.instance = new FavoritesProductController()
    }
    return FavoritesProductController.instance
  }

  async add (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FavoritesProductsService.add(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async del (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id продукта',
          'FavoritesProductController del'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'FavoritesProductController del'))
      }
      const result = await FavoritesProductsService.del(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'FavoritesProductController getAll'))
      }
      const products = await FavoritesProductsService.getAll(limit, page)
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  async getById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id продукта',
          'FavoritesProductController getById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'FavoritesProductController getById'))
      }
      const result = await FavoritesProductsService.getById(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default FavoritesProductController.getInstance()
