import { RootState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const allFavProducts = (state: RootState) => state.product.favoriteProducts
const listIdFavProducts = (state: RootState) => state.product.listIdFavProducts || []
const productIsInFavorite = (id: number) => createSelector(listIdFavProducts, items =>
  items.includes(id)
)
const filterState = (state: RootState) => state.product.filterState
const countProducts = (state: RootState) => state.product.products?.length || 0
const countFavProducts = (state: RootState) => state.product.listIdFavProducts?.length || 0
const allProducts = (state: RootState) => state.product.products
const viewProducts = (state: RootState) => state.product.ViewProducts
const pageProduct = (state: RootState) => state.product.pageProduct
const pageFavProduct = (state: RootState) => state.product.pageFavProduct
const totalProduct = (state: RootState) => state.product.totalProduct
const totalFavProduct = (state: RootState) => state.product.totalFavProduct
const getProduct = (id: number) => (state: RootState) => {
  return state.product.products.filter(product => product.id === id)[0] || undefined
}
const getFavProduct = (id: number) => (state: RootState) => {
  return state.product.favoriteProducts.filter(product => product.id === id)[0] || undefined
}

const selectProduct = {
  allProducts,
  viewProducts,
  productIsInFavorite,
  allFavProducts,
  countProducts,
  countFavProducts,
  filterState,
  pageProduct,
  pageFavProduct,
  totalProduct,
  totalFavProduct,
  getProduct,
  getFavProduct
}

export default selectProduct
