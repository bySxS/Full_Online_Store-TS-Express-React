import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import BasketController from './basket.controller'
import { validateId, validateLimitPage } from '@/validator'

const router = Router()

try {
  router.post('/add', AuthMiddleware, BasketController.addProductToBasket)
  router.delete('/:id', validateId(), AuthMiddleware, BasketController.delProductFromBasket)
  router.get('/all_orders', validateLimitPage(), AuthMiddleware, BasketController.getAllOrdersByUserId)
  router.get('/current', AuthMiddleware, BasketController.getCurrentBasketByAuthUser)
  router.get('/need_process', validateLimitPage(), RoleMiddleware(['admin']), BasketController.getAllOrdersInProgressAllUsers)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Basket routers', 'BasketRouter')
}

export default router
