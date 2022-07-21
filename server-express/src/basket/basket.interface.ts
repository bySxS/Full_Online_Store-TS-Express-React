import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'

export interface IBasket {
  id?: number
  user_id: number
  status: string
  comment: string
  delivery_address: string
  phone_number: string
  date_processing?: Date | string
  delivery_date?: Date | string
}

export interface IBasketProduct {
  id?: number
  basketId: number
  productId: number
  productPriceId: number
  currentPrice: number
  productCount: number
}

export interface IBasketService {
  addProductToBasket: (userId: number, Dto: IBasketProduct) => Promise<IMessage>
  delProductFromBasket: (id: number) => Promise<IMessage>
  getAllOrdersByUserId: (id: number, limit: number, page: number) => Promise<IMessage>
  getCurrentBasketByUserId: (id: number) => Promise<IMessage>
  getAllOrdersInProgressAllUsers: (limit: number, page: number) => Promise<IMessage>
  isUserBoughtProduct: (userId: number, productId: number) => Promise<boolean>
}

export interface IBasketController {
  addProductToBasket: (req: Request, res: Response, next: NextFunction) => void
  delProductFromBasket: (req: Request, res: Response, next: NextFunction) => void
  getAllOrdersByUserId: (req: Request, res: Response, next: NextFunction) => void
  getCurrentBasketByAuthUser: (req: Request, res: Response, next: NextFunction) => void
  getAllOrdersInProgressAllUsers: (req: Request, res: Response, next: NextFunction) => void
}
