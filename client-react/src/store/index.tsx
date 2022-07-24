import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { SUBSCRIBE_STORE } from 'constants/constant'
import myStoreApi from 'api/myStoreApi'

const reducers = {
  // favouriteMovies: favouriteMoviesSlice,
  // movies: movieSlice,
  // user: userSlice,
  [myStoreApi.reducerPath]: myStoreApi.reducer
}

const rootReducer = combineReducers({
  ...reducers
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(myStoreApi.middleware)
  })
}

// Can still subscribe to the store
if (SUBSCRIBE_STORE) {
  setupStore().subscribe(() =>
    console.log(setupStore().getState()))
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
