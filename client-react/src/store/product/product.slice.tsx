import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IResultList } from 'store/myStore/myStore.interface'
import { IFilterState, IProduct } from 'store/myStore/myStoreProduct.interface'
import { myStoreProductEndpoint } from 'store/myStore/myStoreProduct.api'
import { addDomainToImgProducts } from 'utils'
import { myStoreFavProductEndpoint } from 'store/myStore/myStoreFavProduct.api'
import { IFavProduct, IFavProductList } from 'store/myStore/myStoreFavProduct.interface'

// const LS_PRODUCT_KEY = 'rpk'
const LS_VIEW_PRODUCT_KEY = 'rViewPk'
// const LS_FAV_PRODUCT_KEY = 'rFavPk'

export type TypeMaterial = 'Col' | 'Row'

interface IProductState {
  ViewProducts: TypeMaterial
  products: IProduct[]
  favoriteProducts: IProduct[]
  listIdFavProducts: number[]
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
  listIdFavProducts: [],
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
  }

const addFavProductToList =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IFavProduct>>
  ) => {
    const { productId } = action.payload.result
    if (!state.listIdFavProducts.includes(productId)) {
      state.listIdFavProducts.push(productId)
    }
    if (!state.favoriteProducts
      .map(product => product.id)
      .includes(productId)) {
      state.favoriteProducts.push(
        state.products
          .filter(product => product.id === productId)[0]
      )
      state.pageFavProduct = 1
      state.totalFavProduct = 10
    }
  }

const delFavProductFromList =
  (
    state: IProductState,
    action: PayloadAction<IMessage<IFavProduct>>
  ) => {
    const { productId } = action.payload.result
    if (state.listIdFavProducts.includes(productId)) {
      state.listIdFavProducts =
        state.listIdFavProducts.filter(id => id !== productId)
    }
  }

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProducts,
    delOneFavProduct (state,
      action: PayloadAction<number>) {
      const productId = action.payload
      state.favoriteProducts =
          state.favoriteProducts
            .filter(product => product.id !== productId)
      state.pageFavProduct = 1
      state.totalFavProduct = 10
    },
    clearProducts (state) {
      state.products = []
      state.pageProduct = 1 // ставим начальные страницы для paginator
      state.totalProduct = 10
    },
    clearFavProducts (state) {
      state.listIdFavProducts = []
      state.favoriteProducts = []
      state.pageFavProduct = 1 // ставим начальные страницы для paginator
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
      myStoreFavProductEndpoint.getFavProductsList.matchFulfilled,
      (
        state: IProductState,
        action: PayloadAction<IMessage<IFavProductList[]>>
      ) => {
        state.listIdFavProducts =
          action.payload.result?.map(product => product.productId)
      }
    )
    builder.addMatcher(
      myStoreFavProductEndpoint.addToFavProduct.matchFulfilled,
      (
        state,
        action: PayloadAction<IMessage<IFavProduct>>
      ) => {
        addFavProductToList(state, action)
      }
    )
    builder.addMatcher(
      myStoreFavProductEndpoint.delFromFavProduct.matchFulfilled,
      (
        state,
        action: PayloadAction<IMessage<IFavProduct>>
      ) => {
        delFavProductFromList(state, action)
      }
    )
  }
})

export const productAction = ProductSlice.actions
export const productReducer = ProductSlice.reducer
