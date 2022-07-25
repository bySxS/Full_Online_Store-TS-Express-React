import { IMessage } from '@/interface'

export interface IProductViewService {
  createViewsProduct: (productId: number) => Promise<IMessage>
  incrementViewById: (productId: number, count: number) => Promise<IMessage>
  decrementViewById: (productId: number, count: number) => Promise<IMessage>
}
