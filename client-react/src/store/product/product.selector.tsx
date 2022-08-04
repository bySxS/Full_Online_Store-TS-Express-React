import { RootState } from 'store/index'

const allFavProducts = (state: RootState) => state.product.favoriteProducts
const productIsInFavorite = (id: number) => (state: RootState): boolean => {
  const products = state.product.favoriteProducts || []
  const ids = new Set(products.map(o => o.id))
  return ids.has(id)
}

const allProducts = (state: RootState) => state.product.products
const viewProducts = (state: RootState) => state.product.ViewProducts

const selectProduct = {
  allProducts, viewProducts, productIsInFavorite, allFavProducts
}

export default selectProduct
