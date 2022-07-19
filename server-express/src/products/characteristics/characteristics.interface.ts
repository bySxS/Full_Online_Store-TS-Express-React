import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface ICharacteristicValue {
  id?: number
  categoryId?: number
  name: string
  fieldType?: string
  parentId?: number
}

export interface ICharacteristicSet {
  id?: number
  productId: number
  value: string
  characteristicsValuesId: number
}

export interface ICharacteristicService {
  addCharacteristicValue: (Dto: ICharacteristicValue) => Promise<IMessage>
  updCharacteristicValue: (id: number, Dto: ICharacteristicValue) => Promise<IMessage>
  delCharacteristicValue: (id: number) => Promise<IMessage>

  addCharacteristicProduct: (Dto: ICharacteristicSet) => Promise<IMessage>
  updCharacteristicProduct: (id: number, Dto: ICharacteristicSet) => Promise<IMessage>
  delCharacteristicProduct: (id: number) => Promise<IMessage>
  getCharacteristicProductById: (id: number) => Promise<IMessage>
}

export interface ICharacteristicController {
  addCharacteristicValue: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicValueById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicValueById: (req: Request, res: Response, next: NextFunction) => void

  addCharacteristicProduct: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicProductById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicProductById: (req: Request, res: Response, next: NextFunction) => void
  getCharacteristicProductById: (req: Request, res: Response, next: NextFunction) => void
}
