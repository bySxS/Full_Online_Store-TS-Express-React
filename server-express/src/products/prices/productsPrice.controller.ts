import { IProductPriceController } from './productsPrice.interface'
import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import ProductsPriceService from './productsPrice.service'

class ProductsPriceController implements IProductPriceController {
  private static instance = new ProductsPriceController()

  static getInstance (): ProductsPriceController { // паттерн singleton одиночка
    if (!ProductsPriceController.instance) {
      ProductsPriceController.instance = new ProductsPriceController()
    }
    return ProductsPriceController.instance
  }

  async getTypesPrices (req: Request, res: Response, next: NextFunction) {
    try {
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'ProductsPriceController getTypesPrices'))
      }
      const productsPrice = await ProductsPriceService.getTypesPrices(limit, page)
      return res.status(200).json(productsPrice)
    } catch (err) {
      next(err)
    }
  }

  async addTypePrice (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.name) {
        return next(ApiError.badRequest(
          'Не удалось добавить тип цены, не указано поле name',
          'ProductsPriceController add'))
      }
      const result = await ProductsPriceService.addTypePrice(req.body.name)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateTypePriceById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id типа цены',
          'ProductsPriceController updateById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'ProductsPriceController updateById'))
      }
      await ProductsPriceService.getTypePriceById(id) // проверка на наличие
      const result = await ProductsPriceService.updateTypePrice(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delTypePriceById (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id типа цены',
          'ProductsPriceController deleteById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'ProductsPriceController deleteById'))
      }
      const result = await ProductsPriceService.delTypePrice(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductsPriceController.getInstance()
