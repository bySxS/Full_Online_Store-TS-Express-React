import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SUBSCRIBE_STORE } from 'constants/constant'
import myStoreUserApi from 'store/myStore/myStoreUser.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { basketReducer } from 'store/basket/basket.slice'
import { alertReducer } from 'store/alert/alert.slice'
import { userReducer } from 'store/user/user.slice'
import { alertListenerMiddleware } from 'store/alert/alert.listener'
import { logoutListenerMiddleware } from 'store/user/user.listener'
import myStoreProductApi from 'store/myStore/myStoreProduct.api'

const reducers = {
  user: userReducer,
  basket: basketReducer,
  alert: alertReducer,
  [myStoreUserApi.reducerPath]: myStoreUserApi.reducer,
  [myStoreProductApi.reducerPath]: myStoreProductApi.reducer
}

const rootReducer = combineReducers({
  ...reducers
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(myStoreUserApi.middleware, myStoreProductApi.middleware)
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
