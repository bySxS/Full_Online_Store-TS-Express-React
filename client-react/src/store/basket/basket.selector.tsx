import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const basketProduct = (state: RootState) => state.basket.product
const basketProductFullInfo = (state: RootState) => state.basket.productFullInfo
const countProductInBasket = (state: RootState) => state.basket.product.length

const basketPrice = createSelector(basketProductFullInfo, item => {
  return item.reduce((prev, i) => prev + i.currentPrice * i.productCount, 0)
})

const productIsInBasket = (id: number) => createSelector(basketProduct, item => {
  return item.map(i => i.productId).includes(id)
})

const needSyncBasket = (state: RootState) => state.basket.syncBasketAfterAuth

const selectBasket = {
  basketProduct,
  productIsInBasket,
  countProductInBasket,
  needSyncBasket,
  basketProductFullInfo,
  basketPrice
}

export default selectBasket
