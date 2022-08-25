import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from '../myStore/myStore.interface'
import { myStoreBasketEndpoint } from '../myStore/myStoreBasket.api'
import { IBasketProductIn } from '../myStore/myStoreBasket.interface'

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

const addToBasket = (state: IBasketState, action: PayloadAction<IBasket>) => {
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
    delFromBasket
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
  }
})

export const basketAction = BasketSlice.actions
export const basketReducer = BasketSlice.reducer
