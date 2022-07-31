import { RootState } from 'store/index'

export const basketProduct = (state: RootState) => state.basket.product

export const productIsInBasket = (id: number) => (state: RootState): boolean => {
  return state.basket.product.includes(id)
}
