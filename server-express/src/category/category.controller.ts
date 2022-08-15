import { NextFunction, Request, Response } from 'express'
import { ICategoryController } from './category.interface'
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
          await CategoryService.getAll(req.body)
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
      const id = +req.params.id
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
      const id = +req.params.id
      const result =
        await CategoryService.del(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async search (req: Request, res: Response, next: NextFunction) {
    try {
      const value: string = '' + req.query.value || ''
      const limit = +(req.query.limit || 10)
      const page = +(req.query.page || 1)
      const searchCategory =
        await CategoryService.search(value, limit, page)
      return res.status(200).send(searchCategory)
    } catch (err) {
      next(err)
    }
  }
}

export default CategoryController.getInstance()
