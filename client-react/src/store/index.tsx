import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SUBSCRIBE_STORE } from 'constants/constant'
import { setupListeners } from '@reduxjs/toolkit/query'
import { basketReducer } from './basket/basket.slice'
import { alertReducer } from './alert/alert.slice'
import { userReducer } from './user/user.slice'
import { alertListenerMiddleware } from './alert/alert.listener'
import { logoutListenerMiddleware } from './user/user.listener'
import { productReducer } from './product/product.slice'
import myStoreUserApi from './myStore/myStoreUser.api'
import myStoreProductApi from './myStore/myStoreProduct.api'

const reducers = {
  user: userReducer,
  basket: basketReducer,
  alert: alertReducer,
  product: productReducer,
  [myStoreUserApi.reducerPath]: myStoreUserApi.reducer,
  [myStoreProductApi.reducerPath]: myStoreProductApi.reducer
}

const rootReducer = combineReducers({
  ...reducers
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({})
      .concat([
        myStoreUserApi.middleware,
        myStoreProductApi.middleware
      ])
      .prepend(alertListenerMiddleware.middleware)
      .prepend(logoutListenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

// Can still subscribe to the store
if (SUBSCRIBE_STORE) {
  store.subscribe(() =>
    console.log(store.getState()))
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
