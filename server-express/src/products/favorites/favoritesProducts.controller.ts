import { IFavoritesProductController } from './favoritesProducts.interface'
import { NextFunction, Request, Response } from 'express'
import FavoritesProductsService from '@/products/favorites/favoritesProducts.service'
import { IJwt } from '@/users/token/token.interface'

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
      const id = +req.params.id
      const result = await FavoritesProductsService.del(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getAllByAuthUser (req: Request, res: Response, next: NextFunction) {
    try {
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const authUser = req.user as IJwt
      const products =
        await FavoritesProductsService.getAllByUserId(authUser.id, limit, page)
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  async getCountFavoritesByProductId (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const result = await FavoritesProductsService.getCountFavoritesByProductId(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default FavoritesProductController.getInstance()
