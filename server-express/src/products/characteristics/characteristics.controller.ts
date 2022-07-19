import ApiError from '@/apiError'
import { NextFunction, Request, Response } from 'express'
import { ICharacteristicController } from '@/products/characteristics/characteristics.interface'
import CharacteristicsService from '@/products/characteristics/characteristics.service'

class CharacteristicsController implements ICharacteristicController {
  private static instance = new CharacteristicsController()

  static getInstance (): CharacteristicsController { // паттерн singleton одиночка
    if (!CharacteristicsController.instance) {
      CharacteristicsController.instance = new CharacteristicsController()
    }
    return CharacteristicsController.instance
  }

  async addCharacteristicProduct (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CharacteristicsService.addCharacteristicProduct(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updCharacteristicProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CharacteristicsController updCharacteristicProductById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CharacteristicsController updCharacteristicProductById'))
      }
      const result =
        await CharacteristicsService.updCharacteristicProduct(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getCharacteristicProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CharacteristicsController delCharacteristicValue'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CharacteristicsController delCharacteristicValue'))
      }
      const result =
        await CharacteristicsService.getCharacteristicProductById(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async addCharacteristicValue (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CharacteristicsService.addCharacteristicValue(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delCharacteristicValueById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CharacteristicsController delCharacteristicValue'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CharacteristicsController delCharacteristicValue'))
      }
      const result =
        await CharacteristicsService.delCharacteristicValue(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updCharacteristicValueById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CharacteristicsController updCharacteristicValueById'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CharacteristicsController updCharacteristicValueById'))
      }
      const result =
        await CharacteristicsService.updCharacteristicValue(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delCharacteristicProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      if (!req.params.id) {
        return next(ApiError.forbidden(
          'Не указан id характеристики',
          'CharacteristicsController delCharacteristicProduct'))
      }
      const id = +req.params.id
      if (isNaN(id)) {
        return next(ApiError.forbidden(
          'ID должен быть с цифр',
          'CharacteristicsController delCharacteristicProduct'))
      }
      const result =
        await CharacteristicsService.delCharacteristicProduct(id)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default CharacteristicsController.getInstance()
