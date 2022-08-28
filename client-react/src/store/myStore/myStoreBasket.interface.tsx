export interface IBasketToOrderIn {
  userId: number
  comment: string
  deliveryAddress: string
  phoneNumber: string
  fullName: string
}

export interface IBasketProductIn {
  productId: number
  productCount: number
  productPriceId?: number
  currentPrice?: number
  basketId?: number
  createdAt?: Date | string
  id?: number
}

export interface IBasketList {
  productId: number
  productCount: number
}

export interface IBasketProductSyncIn {
  productsInBasket: IBasketList[]
}

export interface IBasketProductSyncOut {
  needDeleteProductFromBasket: number[]
  productsInBasket: IBasketList[]
}

export interface IBasketProductOut {
  id: number
  basketId: number
  productPriceId: number
  currentPrice: number
  productCount: number
  createdAt: string
  updatedAt: string
  productId: number
  productTitle: string
  productCategory: string
  productCategoryId: number
  productSection: string
  productSectionId: number
  productScreen: string
  productPriceType: string
  productAvailability: number
}

export interface IBasket {
  id: number
  userId: number
  status: string
  fullName: string
  comment?: string
  deliveryAddress: string
  phoneNumber: string
  dateProcessing?: string
  deliveryDate?: string
  createdAt: Date | string
  updatedAt: Date | string
  BasketProducts: IBasketProductOut[]
}

export interface IBasketToOrderOut {
  BasketProducts: IBasketProductOut
  comment: string
  deliveryAddress: string
  phoneNumber: string
  fullName: string
}

export interface IAllOrders {
  id: number
  userId: number
  status: string
  fullName: string
  comment?: string
  deliveryAddress: string
  phoneNumber: string
  dateProcessing: Date
  deliveryDate: Date
  createdAt: Date
  updatedAt: Date
  currentPrice: number
  productCount: number
  title: string
}

export type TBasketStatus = 'SelectsTheProduct' |
  'InProcessing' | 'InDelivery' | 'Completed' | 'Cancelled'

export interface IOrderChange {
  deliveryDate: string | Date
  comment: string
  status: TBasketStatus
  dateProcessing: string | Date
  forciblyUpd: boolean // обновить принудительно
}
