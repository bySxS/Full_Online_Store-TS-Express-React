export type TBasketStatus = 'SelectsTheProduct' |
  'InProcessing' | 'InDelivery' | 'Completed' | 'Cancelled'
export type TBasketStatusRus = 'Выбор продуктов' |
  'В обработке' | 'Товар в доставке' | 'Выполнен' | 'Отменён'

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
  createdAt?: string
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
  id?: number
  basketId?: number
  createdAt?: string
  updatedAt?: string
  currentPrice: number
  productCount: number
  productPriceId: number
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
  status: TBasketStatus
  fullName: string
  comment?: string
  deliveryAddress: string
  phoneNumber: string
  dateProcessing?: string
  deliveryDate?: string
  createdAt: string
  updatedAt: string
  BasketProducts: IBasketProductOut[]
}

export interface IBasketToOrderOut {
  BasketProducts: IBasketProductOut[]
  comment: string
  deliveryAddress: string
  phoneNumber: string
  fullName: string
}

export interface IOrderChange {
  deliveryDate: string
  comment: string
  status: TBasketStatus
  dateProcessing: string
  forciblyUpd: boolean // обновить принудительно
}
