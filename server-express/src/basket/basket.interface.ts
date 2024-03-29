import { IMessage } from '@/interface'
import { NextFunction, Request, Response } from 'express'
import { QueryBuilder } from 'objection'
import BasketProductsModel from '@/basket/basketProducts.model'

export type BasketStatus = 'SelectsTheProduct' |
'InProcessing' | 'InDelivery' | 'Completed' | 'Cancelled'

export interface IBasket {
  id?: number
  userId: number
  status: BasketStatus
  fullName: string
  comment: string
  deliveryAddress: string
  phoneNumber: string
  forciblyUpd: boolean
  dateProcessing?: Date | string
  deliveryDate?: Date | string
}

export interface IBasketProduct {
  id?: number
  basketId: number
  productId: number
  productPriceId: number
  currentPrice: number
  productCount: number
}

export interface IBasketList {
  productId: number
  productCount: number
}

export interface IBasketProductSync {
  productsInBasket: IBasketList[]
}

export interface IBasketService {
  addProductToBasket: (userId: number, Dto: IBasketProduct) => Promise<IMessage>
  changeCountProductInBasket: (userId: number, Dto: IBasketProduct) => Promise<IMessage>
  delProductFromBasket: (userId: number, productId: number) => Promise<IMessage>
  getAllOrdersByUserId: (userId: number, limit: number, page: number) => Promise<IMessage>
  getCurrentBasketByUserId: (userId: number) => Promise<IMessage>
  getAllOrdersInProgressAllUsers: (limit: number, page: number) => Promise<IMessage>
  isUserBoughtProduct: (userId: number, productId: number) => Promise<boolean>
  currentBasketToProcessing: (Dto: IBasket) => Promise<IMessage>
  updBasketById: (id: number, Dto: IBasket) => Promise<IMessage>
  getBasketProducts: (basketId: number) => QueryBuilder<BasketProductsModel, BasketProductsModel[]>
  syncProductBasketAfterAuth: (userId: number, Dto: IBasketProductSync) => Promise<IMessage>
  getProductBasketNoneAuthUser: (Dto: IBasketProductSync) => Promise<IMessage>
  cancelOrderByAuthUser: ({ userId, comment, basketId }:
    { userId: number, basketId: number, comment: string }) => Promise<IMessage>
}

export interface IBasketController {
  addProductToBasket: (req: Request, res: Response, next: NextFunction) => void
  changeCountProductInBasket: (req: Request, res: Response, next: NextFunction) => void
  delProductFromBasket: (req: Request, res: Response, next: NextFunction) => void
  getAllOrdersByUserId: (req: Request, res: Response, next: NextFunction) => void
  currentBasketToProcessing: (req: Request, res: Response, next: NextFunction) => void
  getCurrentBasketByAuthUser: (req: Request, res: Response, next: NextFunction) => void
  getAllOrdersInProgressAllUsers: (req: Request, res: Response, next: NextFunction) => void
  updBasketById: (req: Request, res: Response, next: NextFunction) => void
  syncProductBasketAfterAuth: (req: Request, res: Response, next: NextFunction) => void
  getProductBasketNoneAuthUser: (req: Request, res: Response, next: NextFunction) => void
  cancelOrderByAuthUser: (req: Request, res: Response, next: NextFunction) => void
}
