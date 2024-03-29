import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SUBSCRIBE_STORE } from 'constants/constant'
import { setupListeners } from '@reduxjs/toolkit/query'
import { alertListenerMiddleware } from './alert/alert.listener'
import myStoreFavProductApi from './myStore/myStoreFavProduct.api'
import { logoutListenerMiddleware } from './user/user.listener'
import myStoreUserApi from './myStore/myStoreUser.api'
import myStoreProductApi from './myStore/myStoreProduct.api'
import myStoreBasketApi from 'store/myStore/myStoreBasket.api'
import myStoreCategoryApi from 'store/myStore/myStoreCategory.api'
import myStoreCharacteristicsApi from 'store/myStore/myStoreCharacteristics.api'
import myStorePriceApi from 'store/myStore/myStorePrice.api'
import myStoreReviewApi from 'store/myStore/myStoreReview.api'
import { categoryReducer } from './category/category.slice'
import { basketReducer } from './basket/basket.slice'
import { alertReducer } from './alert/alert.slice'
import { userReducer } from './user/user.slice'
import { productReducer } from './product/product.slice'

const reducers = {
  user: userReducer,
  basket: basketReducer,
  alert: alertReducer,
  product: productReducer,
  category: categoryReducer,
  [myStoreUserApi.reducerPath]: myStoreUserApi.reducer,
  [myStoreProductApi.reducerPath]: myStoreProductApi.reducer,
  [myStoreFavProductApi.reducerPath]: myStoreFavProductApi.reducer,
  [myStoreBasketApi.reducerPath]: myStoreBasketApi.reducer,
  [myStoreCategoryApi.reducerPath]: myStoreCategoryApi.reducer,
  [myStoreCharacteristicsApi.reducerPath]: myStoreCharacteristicsApi.reducer,
  [myStorePriceApi.reducerPath]: myStorePriceApi.reducer,
  [myStoreReviewApi.reducerPath]: myStoreReviewApi.reducer
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
        myStoreProductApi.middleware,
        myStoreFavProductApi.middleware,
        myStoreBasketApi.middleware,
        myStoreCategoryApi.middleware,
        myStoreCharacteristicsApi.middleware,
        myStorePriceApi.middleware,
        myStoreReviewApi.middleware
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
