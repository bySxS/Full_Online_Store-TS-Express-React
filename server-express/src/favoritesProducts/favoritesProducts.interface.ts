import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface IFavoritesProduct {
  id?: number
  userId: number
  productId: number
}

export interface IFavoritesProductService {
  add: (Dto: IFavoritesProduct) => Promise<IMessage>
  del: (Dto: IFavoritesProduct) => Promise<IMessage>
  getCountFavoritesByProductId: (productId: number) => Promise<IMessage>
  getAllByUserId: (userId: number, limit: number, page: number) => Promise<IMessage>
}

export interface IFavoritesProductController {
  add: (req: Request, res: Response, next: NextFunction) => void
  del: (req: Request, res: Response, next: NextFunction) => void
  getCountFavoritesByProductId: (req: Request, res: Response, next: NextFunction) => void
  getAllByAuthUser: (req: Request, res: Response, next: NextFunction) => void
}
