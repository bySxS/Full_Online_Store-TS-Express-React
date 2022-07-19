import { IMessage } from '@/interface'

export interface IProductViewService {
  createViewsProduct: (id: number) => Promise<IMessage>
  incrementViewById: (id: number, count: number) => Promise<IMessage>
  decrementViewById: (id: number, count: number) => Promise<IMessage>
}
