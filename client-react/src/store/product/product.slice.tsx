import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IProduct } from 'store/myStore/myStoreProduct.interface'
import { myStoreProductEndpoint } from 'store/myStore/myStoreProduct.api'
import { addDomainToImgProducts } from 'utils'
import { myStoreFavProductEndpoint } from 'store/myStore/myStoreFavProduct.api'
import { IFavProduct } from 'store/myStore/myStoreFavProduct.interface'

const LS_PRODUCT_KEY = 'rpk'
const LS_VIEW_PRODUCT_KEY = 'rViewPk'
const LS_FAV_PRODUCT_KEY = 'rFavPk'

export type TypeMaterial = 'Col' | 'Row'

interface IProductState {
  ViewProducts: TypeMaterial
  products: IProduct[] | undefined
  favoriteProducts: IProduct[] | undefined
}

const viewProductsString = localStorage.getItem(LS_VIEW_PRODUCT_KEY) || ''
let ViewProducts = ''
if (viewProductsString) {
  try {
    ViewProducts = JSON.parse(viewProductsString)
  } catch (e) {
    ViewProducts = ''
  }
}

const initialState: IProductState = {
  ViewProducts: ViewProducts as TypeMaterial || 'Row',
  favoriteProducts: JSON.parse(localStorage.getItem(LS_FAV_PRODUCT_KEY) ?? '[]'),
  products: JSON.parse(localStorage.getItem(LS_PRODUCT_KEY) ?? '[]')
}

const addProducts =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IResultList<IProduct>>>
  ) => {
    const { payload } = action
    const prevProducts = state.products ?? []
    const ids = new Set(prevProducts.map(o => o.id))
    const products = payload.result.results
    const productsChanged = addDomainToImgProducts(products)
    state.products = [
      ...prevProducts,
      ...productsChanged.filter(o => !ids.has(o.id))
    ]
    localStorage.setItem(LS_PRODUCT_KEY,
      JSON.stringify(state.products))
  }

const addFavProducts =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IResultList<IProduct>>>
  ) => {
    const { payload } = action
    const prevProducts = state.favoriteProducts ?? []
    const ids = new Set(prevProducts.map(o => o.id))
    const products = payload.result.results
    const productsChanged = addDomainToImgProducts(products)
    state.favoriteProducts = [
      ...prevProducts,
      ...productsChanged.filter(o => !ids.has(o.id))
    ]
    localStorage.setItem(LS_FAV_PRODUCT_KEY,
      JSON.stringify(state.favoriteProducts))
  }

const addOneFavProduct =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IFavProduct>>
  ) => {
    const { productId } = action.payload.result
    if (state.products) {
      const needProduct = [state.products[productId]]
      const prevProducts = state.favoriteProducts as IProduct[] ?? []
      const ids = new Set(prevProducts.map(o => o.id))
      state.favoriteProducts = [
        ...prevProducts,
        ...needProduct.filter(o => !ids.has(o.id))
      ]
      localStorage.setItem(LS_FAV_PRODUCT_KEY,
        JSON.stringify(state.favoriteProducts))
    }
  }

const delOneFavProduct =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IFavProduct>>
  ) => {
    const { productId } = action.payload.result
    const prevProducts = state.favoriteProducts ?? []
    state.favoriteProducts = [
      ...prevProducts.filter(o => o.id !== productId)
    ]
    localStorage.setItem(LS_FAV_PRODUCT_KEY,
      JSON.stringify(state.favoriteProducts))
  }

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProducts,
    changeViewProducts (state, action: PayloadAction<TypeMaterial>) {
      state.ViewProducts = action.payload
      localStorage.setItem(LS_VIEW_PRODUCT_KEY,
        JSON.stringify(state.ViewProducts))
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      myStoreProductEndpoint.allProducts.matchFulfilled,
      (state,
        action: PayloadAction<IMessage<IResultList<IProduct>>>) => {
        addProducts(state, action)
      }
    )
    builder.addMatcher(
      myStoreFavProductEndpoint.getFavProducts.matchFulfilled,
      (
        state,
        action: PayloadAction<IMessage<IResultList<IProduct>>>
      ) => {
        addFavProducts(state, action)
      }
    )
    builder.addMatcher(
      myStoreFavProductEndpoint.addToFavProduct.matchFulfilled,
      (
        state,
        action: PayloadAction<IMessage<IFavProduct>>
      ) => {
        addOneFavProduct(state, action)
      }
    )
    builder.addMatcher(
      myStoreFavProductEndpoint.delFromFavProduct.matchFulfilled,
      (
        state,
        action: PayloadAction<IMessage<IFavProduct>>
      ) => {
        delOneFavProduct(state, action)
      }
    )
  }
})

export const productAction = ProductSlice.actions
export const productReducer = ProductSlice.reducer
