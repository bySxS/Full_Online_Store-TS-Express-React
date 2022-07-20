import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import { ICategoryController } from '@/products/category/category.interface'
import CategoryService from './category.service'

class CategoryController implements ICategoryController {
  private static instance = new CategoryController()

  static getInstance (): CategoryController { // паттерн singleton одиночка
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController()
    }
    return CategoryController.instance
  }

  async getAll (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CategoryService.getAll()
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async add (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CategoryService.add(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async upd (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CategoryController upd'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CategoryController upd'))
      }
      const result =
        await CategoryService.upd(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async del (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CategoryController del'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CategoryController del'))
      }
      const result =
        await CategoryService.del(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async search (req: Request, res: Response, next: NextFunction) {
    try {
      const name: string = String(req.query.name || '')
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      if (isNaN(limit) || isNaN(page)) {
        return next(ApiError.forbidden(
          'limit и page должны быть с цифр',
          'CategoryController search'))
      }
      const searchCategory = await CategoryService.search(name, limit, page)
      return res.status(200).send(searchCategory)
    } catch (err) {
      next(err)
    }
  }
}

export default CategoryController.getInstance()
