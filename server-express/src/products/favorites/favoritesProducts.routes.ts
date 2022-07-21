import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import FavoritesProductsController from '@/products/favorites/favoritesProducts.controller'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateFavoriteProduct } from '@/products/favorites/favoritesProducts.validator'

const router = Router()

try {
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.getAllByAuthUser)
  router.post('/add',
    validateFavoriteProduct, ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.add)
  router.get('/count_product/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware('admin'),
    FavoritesProductsController.getCountFavoritesByProductId)
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.del)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в FavoritesProducts routers', 'FavoritesProductsRouter')
}

export default router
