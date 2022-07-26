import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SUBSCRIBE_STORE } from 'constants/constant'
import myStoreApi from 'store/myStore/myStore.api'
import { setupListeners } from '@reduxjs/toolkit/query'
import { basketReducer } from 'store/reducers/basket.slice'

const reducers = {
  basket: basketReducer,
  [myStoreApi.reducerPath]: myStoreApi.reducer
}

const rootReducer = combineReducers({
  ...reducers
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(myStoreApi.middleware)
})

const setupStore = () => {
  return store
}

setupListeners(store.dispatch)

// Can still subscribe to the store
if (SUBSCRIBE_STORE) {
  store.subscribe(() =>
    console.log(store.getState()))
}

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
