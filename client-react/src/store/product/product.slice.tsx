import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IFilterState, IProduct } from 'store/myStore/myStoreProduct.interface'
import { myStoreProductEndpoint } from 'store/myStore/myStoreProduct.api'
import { addDomainToImgProducts } from 'utils'
import { myStoreFavProductEndpoint } from 'store/myStore/myStoreFavProduct.api'
import { IFavProduct } from 'store/myStore/myStoreFavProduct.interface'

// const LS_PRODUCT_KEY = 'rpk'
const LS_VIEW_PRODUCT_KEY = 'rViewPk'
// const LS_FAV_PRODUCT_KEY = 'rFavPk'

export type TypeMaterial = 'Col' | 'Row'

interface IProductState {
  ViewProducts: TypeMaterial
  products: IProduct[] | undefined
  favoriteProducts: IProduct[] | undefined
  filterState: IFilterState
  pageProduct: number
  totalProduct: number
  pageFavProduct: number
  totalFavProduct: number
  prevCategory: string
}

const initialState: IProductState = {
  ViewProducts: localStorage.getItem(LS_VIEW_PRODUCT_KEY) as TypeMaterial || 'Row',
  favoriteProducts: [], // JSON.parse(localStorage.getItem(LS_FAV_PRODUCT_KEY) ?? '[]'),
  products: [], // JSON.parse(localStorage.getItem(LS_PRODUCT_KEY) ?? '[]'),
  filterState: {},
  pageProduct: 1,
  totalProduct: 10,
  pageFavProduct: 1,
  totalFavProduct: 10,
  prevCategory: ''
}

const addProducts =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IResultList<IProduct>>>
  ) => {
    const { payload } = action
    if (payload.success) {
      const prevProducts = state.products ?? []
      const ids = new Set(prevProducts.map(o => o.id))
      const products = payload.result.results
      const productsChanged = addDomainToImgProducts(products)
      state.products = [
        ...prevProducts,
        ...productsChanged.filter(o => !ids.has(o.id))
      ]
      state.totalProduct = payload.result.total
    }
  }

const addFavProducts =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IResultList<IProduct>>>
  ) => {
    const { payload } = action
    if (payload.success) {
      const prevProducts = state.favoriteProducts ?? []
      const ids = new Set(prevProducts.map(o => o.id))
      const products = payload.result.results
      const productsChanged = addDomainToImgProducts(products)
      state.favoriteProducts = [
        ...prevProducts,
        ...productsChanged.filter(o => !ids.has(o.id))
      ]
      state.totalFavProduct = payload.result.total
    }
    // localStorage.setItem(LS_FAV_PRODUCT_KEY,
    //   JSON.stringify(state.favoriteProducts))
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
      // localStorage.setItem(LS_FAV_PRODUCT_KEY,
      //   JSON.stringify(state.favoriteProducts))
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
    // localStorage.setItem(LS_FAV_PRODUCT_KEY,
    //   JSON.stringify(state.favoriteProducts))
  }

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProducts,
    clearProducts (state) {
      state.products = []
      state.favoriteProducts = [] // очищаем при изменении фильтра
      state.pageProduct = 1 // ставим начальные страницы для paginator
      state.pageFavProduct = 1
      state.totalProduct = 10
      state.totalFavProduct = 10
    },
    setPrevCategory (state, action: PayloadAction<string>) {
      state.prevCategory = action.payload
    },
    incPageProduct (state) {
      state.pageProduct = state.pageProduct + 1
    },
    incPageFavProduct (state) {
      state.pageFavProduct = state.pageFavProduct + 1
    },
    changeFilterState (state, action: PayloadAction<IFilterState>) {
      state.filterState = action.payload
      state.products = [] // очищаем при изменении фильтра
      state.favoriteProducts = [] // очищаем при изменении фильтра
      state.pageProduct = 1 // ставим начальные страницы для paginator
      state.pageFavProduct = 1
      state.totalProduct = 10
      state.totalFavProduct = 10
    },
    changeViewProducts (state) {
      state.ViewProducts = state.ViewProducts === 'Col' ? 'Row' : 'Col'
      localStorage.setItem(LS_VIEW_PRODUCT_KEY, state.ViewProducts)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      myStoreProductEndpoint.allProducts.matchFulfilled,
      (state: IProductState,
        action: PayloadAction<IMessage<IResultList<IProduct>>>) => {
        state.prevCategory = 'all'
        addProducts(state, action)
      }
    )
    builder.addMatcher(
      myStoreProductEndpoint.getAllProductsByCategoryId.matchFulfilled,
      (state: IProductState,
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

export const {
  addProducts: AddProductsCategory,
  clearProducts,
  setPrevCategory
} = ProductSlice.actions
export const productAction = ProductSlice.actions
export const productReducer = ProductSlice.reducer
