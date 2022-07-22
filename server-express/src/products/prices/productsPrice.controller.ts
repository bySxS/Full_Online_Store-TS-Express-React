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
      const productsPrice = await ProductsPriceService.getTypesPrices(limit, page)
      return res.status(200).json(productsPrice)
    } catch (err) {
      next(err)
    }
  }

  async addTypePrice (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductsPriceService.addTypePrice(req.body.name)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updateTypePriceById (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      await ProductsPriceService.getTypePriceById(id) // проверка на наличие
      const result = await ProductsPriceService.updateTypePrice(id, req.body.name)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delTypePriceById (req: Request, res: Response, next: NextFunction) {
    try {
      const id = +req.params.id
      const result = await ProductsPriceService.delTypePrice(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default ProductsPriceController.getInstance()
