import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const basketProduct = (state: RootState) => state.basket.product

const countProductInBasket = (state: RootState) => state.basket.product.length

const productIsInBasket = (id: number) => createSelector(basketProduct, item => {
  return item.map(i => i.productId).includes(id)
})

const needSyncBasket = (state: RootState) => state.basket.syncBasketAfterAuth

const selectBasket = {
  basketProduct,
  productIsInBasket,
  countProductInBasket,
  needSyncBasket
}

export default selectBasket
