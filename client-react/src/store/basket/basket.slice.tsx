import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from '../myStore/myStore.interface'
import { myStoreBasketEndpoint } from '../myStore/myStoreBasket.api'
import {
  IBasket, IBasketList,
  IBasketProductIn, IBasketProductSyncOut
} from '../myStore/myStoreBasket.interface'

const LS_BASKET_KEY = 'rbk'
const LS_SYNC_BASKET_KEY = 'rSyncBk'

interface IBasketState {
  product: IBasketList[]
  syncBasketAfterAuth: boolean
}

const initialState: IBasketState = {
  product: JSON.parse(localStorage.getItem(LS_BASKET_KEY) ?? '[]'),
  syncBasketAfterAuth: localStorage.getItem(LS_SYNC_BASKET_KEY) === '1'
}

const addToBasket = (state: IBasketState, action: PayloadAction<IBasketList>) => {
  const ids = new Set(state.product.map(product => product.productId))
  if (!ids.has(action.payload.productId)) {
    state.product = [...state.product, action.payload]
    localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
  }
}

const delFromBasket = (state: IBasketState, action: PayloadAction<number>) => {
  state.product = state.product.filter(f => f.productId !== action.payload)
  localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
}

export const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket,
    delFromBasket,
    syncBasketOff (state) {
      state.syncBasketAfterAuth = false
      localStorage.removeItem(LS_SYNC_BASKET_KEY)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      myStoreBasketEndpoint.addToBasket.matchFulfilled,
      (state: IBasketState,
        action: PayloadAction<IMessage<IBasketProductIn>>) => {
        const { payload: { result } } = action
        const ids = new Set(state.product.map(product => product.productId))
        if (!ids.has(result.productId)) {
          state.product = [...state.product, {
            productId: result.productId,
            productCount: result.productCount
          }]
          localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
        }
      }
    )
    builder.addMatcher(
      myStoreBasketEndpoint.getBasket.matchFulfilled,
      (state: IBasketState,
        action: PayloadAction<IMessage<IBasket>>) => {
        const { payload: { result } } = action
        const ids = new Set(state.product.map(product => product.productId))
        const newProduct = result.BasketProducts
          .filter(item => !ids.has(item.productId))
          .map(item => ({
            productId: item.productId,
            productCount: item.productCount
          }))
        state.product = state.product.concat(newProduct)
        localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
      }
    )
    builder.addMatcher(
      myStoreBasketEndpoint.syncBasket.matchFulfilled,
      (state: IBasketState,
        action: PayloadAction<IMessage<IBasketProductSyncOut>>) => {
        const { payload: { result } } = action
        state.product = result.productsInBasket
        localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
        state.syncBasketAfterAuth = true
        localStorage.setItem(LS_SYNC_BASKET_KEY, '1')
      }
    )
  }
})

export const basketAction = BasketSlice.actions
export const basketReducer = BasketSlice.reducer
