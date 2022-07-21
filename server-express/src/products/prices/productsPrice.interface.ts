import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface IProductPrice {
  id?: number
  priceTypeId: number
  productId: number
  price: number
  currency?: string
}

export interface IProductPriceService {
  addTypePrice: (name: string) => Promise<IMessage>
  delTypePrice: (id: number) => Promise<IMessage>
  updateTypePrice: (id: number, name: string) => Promise<IMessage>
  getTypePriceById: (id: number) => Promise<IMessage>
  getTypesPrices: (limit: number, page: number) => Promise<IMessage>
  createProductPrice: (Dto: IProductPrice) => Promise<IMessage>
  updateProductPrice: (Dto: IProductPrice) => Promise<IMessage>
  getProductPriceByTypesPricesId: (typePriceId: number, productId: number) => Promise<IMessage>
}

export interface IProductPriceController {
  addTypePrice: (req: Request, res: Response, next: NextFunction) => void
  updateTypePriceById: (req: Request, res: Response, next: NextFunction) => void
  delTypePriceById: (req: Request, res: Response, next: NextFunction) => void
  getTypesPrices: (req: Request, res: Response, next: NextFunction) => void
}
