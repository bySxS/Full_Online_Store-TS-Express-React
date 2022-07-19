import { IProductController, IProductFilesArray } from './products.interface'
import { Request, Response, NextFunction } from 'express'
import ProductsService from './products.service'
import ApiError from '../apiError'
import { IJwt } from '../users/token/token.interface'

class ProductsController implements IProductController {
  private static instance = new ProductsController()

  static getInstance (): ProductsController { // паттерн singleton одиночка
    if (!ProductsController.instance) {
      ProductsController.instance = new ProductsController()
    }
    return ProductsController.instance
  }

  async add (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        return next(ApiError.badRequest(
          'Нету скриншотов для добавления',
          'ProductsController add'))
      }
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const result = await ProductsService.add(req.body, req.files as IProductFilesArray)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id продукта',
          'ProductsController updateById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'ProductsController updateById'))
      }
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const product = await ProductsService.getById(id)
      if (authUser.rolesId !== 1 && product.result.user_id !== authUser.id) {
        return next(ApiError.forbidden(
          'У вас нет доступа для изменения этого продукта',
          'ProductsController updateById'))
      }
      const result = await ProductsService.updateById(id, req.body, req.files as IProductFilesArray)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async deleteById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id продукта',
          'ProductsController deleteById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'ProductsController deleteById'))
      }
      const result = await ProductsService.deleteById(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id продукта',
          'ProductsController getById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'ProductsController getById'))
      }
      const result = await ProductsService.getById(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async search (req: Request, res: Response, next: NextFunction) {
    try {
      const title: string = String(req.query.title || '')
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'ProductsController search'))
      }
      const searchProducts = await ProductsService.search(title, limit, page)
      return res.status(200).send(searchProducts)
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
          'ProductsController getAll'))
      }
      const products = await ProductsService.getAll(limit, page)
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductsController.getInstance()
