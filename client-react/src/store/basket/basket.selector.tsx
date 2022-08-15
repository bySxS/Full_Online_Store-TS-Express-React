import { RootState } from '../index'

const basketProduct = (state: RootState) => state.basket.product

const countProductInBasket = (state: RootState) => state.basket.product.length

const productIsInBasket = (id: number) => (state: RootState): boolean => {
  return state.basket.product.includes(id)
}

const selectBasket = {
  basketProduct, productIsInBasket, countProductInBasket
}

export default selectBasket
