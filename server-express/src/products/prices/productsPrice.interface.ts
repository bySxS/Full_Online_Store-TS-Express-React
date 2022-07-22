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
  addPriceForProduct: (Dto: IProductPrice) => Promise<IMessage>
  updProductPrice: (id: number, Dto: IProductPrice) => Promise<IMessage>
  delProductPrice: (id: number) => Promise<IMessage>
  getProductPriceByTypesPricesId: (typePriceId: number, productId: number) => Promise<IMessage>
  getAllPriceByProductId: (productId: number) => Promise<IMessage>
}

export interface IProductPriceController {
  addPriceForProduct: (req: Request, res: Response, next: NextFunction) => void
  updProductPrice: (req: Request, res: Response, next: NextFunction) => void
  delProductPrice: (req: Request, res: Response, next: NextFunction) => void
  getAllPriceByProductId: (req: Request, res: Response, next: NextFunction) => void
  addTypePrice: (req: Request, res: Response, next: NextFunction) => void
  updateTypePriceById: (req: Request, res: Response, next: NextFunction) => void
  delTypePriceById: (req: Request, res: Response, next: NextFunction) => void
  getTypesPrices: (req: Request, res: Response, next: NextFunction) => void
}
