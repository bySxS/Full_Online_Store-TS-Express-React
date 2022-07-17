import { IProductController, IProductFilesArray } from './products.interface'
import { Request, Response, NextFunction } from 'express'
import ProductsService from './products.service'
import ApiError from '../apiError'

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

    } catch (err) {
      next(err)
    }
  }

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {

    } catch (err) {
      next(err)
    }
  }
}

export default ProductsController.getInstance()
