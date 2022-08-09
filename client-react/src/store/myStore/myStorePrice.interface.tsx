export type TCurrency = '₴' | '$' | '€' | 'USDT'

export interface IPrice {
  priceTypeId: number
  productId: number
  price: number
  currency: TCurrency
}

export interface ITypePrice {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface IProductPrice {
  id: number;
  priceTypeId: number;
  productId: number;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  typeName: string;
}
