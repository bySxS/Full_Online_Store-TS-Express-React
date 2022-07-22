import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import BasketController from './basket.controller'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateBasketProduct } from '@/basket/basket.validator'

const router = Router()

try {
  // success
  router.post('/add',
    validateBasketProduct(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.addProductToBasket)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.delProductFromBasket)
  // success
  router.get('/all_orders',
    validateLimitPage(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.getAllOrdersByUserId)
  // success
  router.get('/current',
    AuthMiddleware,
    BasketController.getCurrentBasketByAuthUser)
  
  router.get('/need_process',
    validateLimitPage(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    BasketController.getAllOrdersInProgressAllUsers)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Basket routers', 'BasketRouter')
}

export default router
