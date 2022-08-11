import { IProductController, IProductFilesArray } from './products.interface'
import { Request, Response, NextFunction } from 'express'
import ProductsService from './products.service'
import ApiError from '@/apiError'
import { IJwt } from '@/users/token/token.interface'

class ProductsController implements IProductController {
  private static instance = new ProductsController()

  static getInstance (): ProductsController { // паттерн singleton одиночка
    if (!ProductsController.instance) {
      ProductsController.instance = new ProductsController()
    }
    return ProductsController.instance
  }

  async add (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.files) {
        return next(ApiError.badRequest(
          'Нету скриншотов для добавления',
          'ProductsController add'))
      }
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const result =
        await ProductsService.add(
          req.body, req.files as IProductFilesArray
        )
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const authUser = req.user as IJwt
      req.body.userId = authUser.id
      const product = await ProductsService.getAllProductsWithFilter()
        .where('products.id', '=', id)
      if (authUser.rolesId !== 1 &&
        (product && 'userId' in product && product.userId !== authUser.id)) {
        return next(ApiError.forbidden(
          'У вас нет доступа для изменения этого продукта',
          'ProductsController updateById'))
      }
      const result =
        await ProductsService.updateById(
          id, req.body, req.files as IProductFilesArray
        )
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async deleteById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result = await ProductsService.deleteById(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result = await ProductsService.getById(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async search (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const value: string = '' + req.query.value || ''
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const searchProducts =
        await ProductsService.search(value, limit, page)
      return res.status(200).send(searchProducts)
    } catch (err) {
      next(err)
    }
  }

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const filterText = String(req.query.filter || '')
      const priceText = String(req.query.price || '0')
      const filter = filterText.split(',')
      const price = priceText.split('_').map(price => +price)
      const sort = String(req.query.sort || '')
      const products = await ProductsService.getAll(
        filter, price, sort, limit, page
      )
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  async getAllByCategoryIdAndFilter (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const filterText = String(req.query.filter || '')
      const filter = filterText.split(',')
      const priceText = String(req.query.price || '0')
      const price = priceText.split('_').map(price => +price)
      const sort = String(req.query.sort || '')
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const products =
        await ProductsService.getAllByCategoryId(
          id, filter, price, sort, limit, page
        )
      return res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductsController.getInstance()
