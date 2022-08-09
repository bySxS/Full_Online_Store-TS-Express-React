import { RootState } from 'store/index'

const allFavProducts = (state: RootState) => state.product.favoriteProducts
const productIsInFavorite = (id: number) => (state: RootState): boolean => {
  const products = state.product.favoriteProducts || []
  const ids = new Set(products.map(o => o.id))
  return ids.has(id)
}

const countProducts = (state: RootState) => state.product.products?.length || 0
const allProducts = (state: RootState) => state.product.products
const viewProducts = (state: RootState) => state.product.ViewProducts

const selectProduct = {
  allProducts,
  viewProducts,
  productIsInFavorite,
  allFavProducts,
  countProducts
}

export default selectProduct
