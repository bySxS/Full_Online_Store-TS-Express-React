import { RootState } from '../index'

const allFavProducts = (state: RootState) => state.product.favoriteProducts
const productIsInFavorite = (id: number) => (state: RootState): boolean => {
  const products = state.product.favoriteProducts || []
  const ids = new Set(products.map(o => o.id))
  return ids.has(id)
}

const filterState = (state: RootState) => state.product.filterState
const countProducts = (state: RootState) => state.product.products?.length || 0
const allProducts = (state: RootState) => state.product.products
const viewProducts = (state: RootState) => state.product.ViewProducts
const pageProduct = (state: RootState) => state.product.pageProduct
const pageFavProduct = (state: RootState) => state.product.pageFavProduct
const totalProduct = (state: RootState) => state.product.totalProduct
const totalFavProduct = (state: RootState) => state.product.totalFavProduct

const selectProduct = {
  allProducts,
  viewProducts,
  productIsInFavorite,
  allFavProducts,
  countProducts,
  filterState,
  pageProduct,
  pageFavProduct,
  totalProduct,
  totalFavProduct
}

export default selectProduct
