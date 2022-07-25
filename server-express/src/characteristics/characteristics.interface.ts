import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface ICharacteristicName {
  id?: number
  categoryId: number
  name: string
  fieldType?: string
  parentId?: number
}

export interface ICharacteristicSetValue {
  id?: number
  productId: number
  value: string
  characteristicsNameId: number
}

export interface ICharacteristicService {
  addCharacteristicName: (Dto: ICharacteristicName) => Promise<IMessage>
  updCharacteristicName: (id: number, Dto: ICharacteristicName) => Promise<IMessage>
  delCharacteristicName: (id: number) => Promise<IMessage>

  addCharacteristicValueProduct: (Dto: ICharacteristicSetValue) => Promise<IMessage>
  updCharacteristicValueProduct: (id: number, Dto: ICharacteristicSetValue) => Promise<IMessage>
  delCharacteristicValueProduct: (id: number) => Promise<IMessage>
  getCharacteristicValueProductById: (id: number) => Promise<IMessage>
}

export interface ICharacteristicController {
  addCharacteristicName: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicNameById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicNameById: (req: Request, res: Response, next: NextFunction) => void

  addCharacteristicValueProduct: (req: Request, res: Response, next: NextFunction) => void
  updCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
  delCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
  getCharacteristicValueProductById: (req: Request, res: Response, next: NextFunction) => void
}
