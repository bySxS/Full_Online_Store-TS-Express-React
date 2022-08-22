import { IMessage } from '@/interface'
import { IGetProducts } from '@/products/products.interface'
import { NextFunction, Request, Response } from 'express'

export interface IFavoritesProduct {
  id?: number
  userId: number
  productId: number
}

export interface IFavoritesProductService {
  add: (Dto: IFavoritesProduct) => Promise<IMessage>
  del: (Dto: IFavoritesProduct) => Promise<IMessage>
  getAllByUserId: (args: IGetProducts) => Promise<IMessage>
  getAllListIdByUserId: (userId: number) => Promise<IMessage>
}

export interface IFavoritesProductController {
  add: (req: Request, res: Response, next: NextFunction) => void
  del: (req: Request, res: Response, next: NextFunction) => void
  getAllByAuthUser: (req: Request, res: Response, next: NextFunction) => void
  getAllListIdByAuthUser: (req: Request, res: Response, next: NextFunction) => void
}
