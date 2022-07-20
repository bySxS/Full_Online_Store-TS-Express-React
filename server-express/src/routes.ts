import { Router } from 'express'
import UsersRoutes from './users/users.routes'
import RolesRoutes from './users/roles/roles.routes'
import ProductsRoutes from './products/products.routes'
import ProductsPriceRoutes from './products/prices/productsPrice.routes'
import FavoritesProductsRoutes from './products/favorites/favoritesProducts.routes'
import CharacteristicsRoutes from './products/characteristics/characteristics.routes'
import CategoryRoutes from './products/category/category.routes'
import BasketRoutes from './basket/basket.routes'
import ApiError from './apiError'
import ReviewRoutes from '@/review/review.routes'
const router = Router()

try {
  router.use('/user/roles', RolesRoutes)
  router.use('/user', UsersRoutes)
  router.use('/category', CategoryRoutes)
  router.use('/product', ProductsRoutes)
  router.use('/characteristics', CharacteristicsRoutes)
  router.use('/favorites_products', FavoritesProductsRoutes)
  router.use('/product/prices', ProductsPriceRoutes)
  router.use('/basket', BasketRoutes)
  router.use('/review', ReviewRoutes)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в routers', 'appRouter')
}

export default router
