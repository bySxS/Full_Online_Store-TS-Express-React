import { Router } from 'express'
// import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import { validateId } from '@/users/users.validator'
import ProductsPriceController from '../prices/productsPrice.controller'
import FavoritesProductsController from '@/products/favorites/favoritesProducts.controller'

const router = Router()

try {
  router.get('/all', AuthMiddleware, ProductsPriceController.getTypesPrices)
  router.post('/add', AuthMiddleware, ProductsPriceController.addTypePrice)
  router.get('/:id', validateId, AuthMiddleware, ProductsPriceController.getTypesPrices)
  router.delete('/:id', validateId, AuthMiddleware, FavoritesProductsController.del)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в FavoritesProducts routers', 'FavoritesProductsRouter')
}

export default router
