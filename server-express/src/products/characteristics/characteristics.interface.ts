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
  characteristicValueId: number
}

export interface ICharacteristicService {
  addCharacteristicValue: (Dto: ICharacteristicValue) => Promise<IMessage>
  updCharacteristicValue: (Dto: ICharacteristicValue) => Promise<IMessage>
  delCharacteristicValue: (id: number) => Promise<IMessage>

  addCharacteristicProduct: (Dto: ICharacteristicSet[]) => Promise<IMessage>
  updCharacteristicProduct: (Dto: ICharacteristicSet[]) => Promise<IMessage>
  getCharacteristicProductById: (id: number) => Promise<IMessage>
}

export interface ICharacteristicController {
  addCharacteristicValue: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicValue: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicValue: (req: Request, res: Response, next: NextFunction) => void

  addCharacteristicProduct: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicProduct: (req: Request, res: Response, next: NextFunction) => void
  getCharacteristicProductById: (req: Request, res: Response, next: NextFunction) => void
}
