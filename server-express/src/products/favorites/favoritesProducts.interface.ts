import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface IFavoritesProduct {
  id?: number
  userId: number
  productId: number
}

export interface IFavoritesProductService {
  add: (Dto: IFavoritesProduct) => Promise<IMessage>
  del: (id: number) => Promise<IMessage>
  getById: (id: number) => Promise<IMessage>
  getAll: (limit: number, page: number) => Promise<IMessage>
}

export interface IFavoritesProductController {
  add: (req: Request, res: Response, next: NextFunction) => void
  del: (req: Request, res: Response, next: NextFunction) => void
  getById: (req: Request, res: Response, next: NextFunction) => void
  getAll: (req: Request, res: Response, next: NextFunction) => void
}
