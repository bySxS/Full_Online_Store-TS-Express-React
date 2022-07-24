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

  async addCharacteristicValueProduct (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CharacteristicsService.addCharacteristicValueProduct(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updCharacteristicValueProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result =
        await CharacteristicsService.updCharacteristicValueProduct(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delCharacteristicValueProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result =
        await CharacteristicsService.delCharacteristicValueProduct(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async getCharacteristicValueProductById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result =
        await CharacteristicsService.getCharacteristicValueProductById(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async addCharacteristicName (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const result =
        await CharacteristicsService.addCharacteristicName(req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async updCharacteristicNameById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result =
        await CharacteristicsService.updCharacteristicName(id, req.body)
      return res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async delCharacteristicNameById (
    req: Request, res: Response, next: NextFunction
  ) {
    try {
      const id = +req.params.id
      const result =
        await CharacteristicsService.delCharacteristicName(id)
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default CharacteristicsController.getInstance()