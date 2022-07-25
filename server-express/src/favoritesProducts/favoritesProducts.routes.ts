import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import FavoritesProductsController from './favoritesProducts.controller'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateFavoriteProduct } from './favoritesProducts.validator'

const router = Router()

try {
  // success
  router.post('/add',
    validateFavoriteProduct(), ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.add)
  // success
  router.get('/count_product/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware('admin'),
    FavoritesProductsController.getCountFavoritesByProductId)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.del)
  // success
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    AuthMiddleware,
    FavoritesProductsController.getAllByAuthUser)
} catch (e) {
  throw ApiError.internalRequest(
    'Ошибка в FavoritesProducts routers',
    'FavoritesProductsRouter')
}

export default router
