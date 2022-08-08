import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import BasketController from './basket.controller'
import { validateId, validateLimitPage } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateBasket, validateBasketProduct, validateUpdBasket } from '@/basket/basket.validator'

const router = Router()

try {
  // success
  router.post('/',
    validateBasketProduct(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.addProductToBasket)
  // success
  router.get('/',
    AuthMiddleware,
    BasketController.getCurrentBasketByAuthUser)
  // success
  router.get('/all_orders',
    validateLimitPage(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.getAllOrdersByUserId)
  // success
  router.get('/need_process',
    validateLimitPage(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    BasketController.getAllOrdersInProgressAllUsers)
  // success
  router.post('/to_order',
    validateBasket(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.currentBasketToProcessing)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    AuthMiddleware,
    BasketController.delProductFromBasket)
  // success
  router.put('/:id',
    validateId(), validateUpdBasket(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    BasketController.updBasketById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Basket routers', 'BasketRouter')
}

export default router
