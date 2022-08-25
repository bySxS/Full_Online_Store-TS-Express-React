import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LS_BASKET_KEY = 'rbk'

interface IBasket {
  productId: number
  productCount: number
}

interface IBasketState {
  product: IBasket[]
}

const initialState: IBasketState = {
  product: JSON.parse(localStorage.getItem(LS_BASKET_KEY) ?? '[]')
}

export const BasketSlice = createSlice({
  name: 'basketGuest',
  initialState,
  reducers: {
    addToBasket (state, action: PayloadAction<IBasket>) {
      const ids = new Set(state.product.map(product => product.productId))
      if (!ids.has(action.payload.productId)) {
        state.product = [...state.product, action.payload]
        localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
      }
    },
    delFromBasket (state, action: PayloadAction<number>) {
      state.product = state.product.filter(f => f.productId !== action.payload)
      localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.product))
    }
  }
})

export const basketAction = BasketSlice.actions
export const basketReducer = BasketSlice.reducer
