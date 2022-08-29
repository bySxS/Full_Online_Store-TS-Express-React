import { TSort } from '@/products/products.interface'
import { IFavoritesProductController } from './favoritesProducts.interface'
import { NextFunction, Request, Response } from 'express'
import FavoritesProductsService from './favoritesProducts.service'
import { IJwt } from '@/users/token/token.interface'

class FavoritesProductController implements IFavoritesProductController {
  private static instance = new FavoritesProductController()

  static getInstance (): FavoritesProductController { // паттерн singleton одиночка
    if (!FavoritesProductController.instance) {
      FavoritesProductController.instance = new FavoritesProductController()
    }
    return FavoritesProductController.instance
  }

  async add (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const result = await FavoritesProductsService.add(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async del (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const result = await FavoritesProductsService.del(req.body)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllByAuthUser (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const categoryId = +(req.query.category_id || 0)
      const filterText = String(req.query.filter || '')
      const filter = filterText.split(',')
      const priceText = String(req.query.price || '0')
      const price = priceText.split('_').map(price => +price)
      const sort = String(req.query.sort || '') as TSort
      const authUser = req.user as IJwt
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const products =
        await FavoritesProductsService
          .getAllByUserId({
            userId: authUser.id,
            filter,
            price,
            sort,
            limit,
            page,
            categoryId
          })
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  async getAllListIdByAuthUser (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const authUser = req.user as IJwt
      const products =
        await FavoritesProductsService
          .getAllListIdByUserId(authUser.id)
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}

export default FavoritesProductController.getInstance()
