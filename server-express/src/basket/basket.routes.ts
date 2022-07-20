import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import BasketController from './basket.controller'

const router = Router()

try {
  router.post('/add', AuthMiddleware, BasketController.addProductToBasket)
  router.delete('/:id', AuthMiddleware, BasketController.delProductFromBasket)
  router.get('/all_orders', AuthMiddleware, BasketController.getAllOrdersByUserId)
  router.get('/current', AuthMiddleware, BasketController.getCurrentBasketByUserId)
  router.get('/need_process', RoleMiddleware(['admin']), BasketController.getAllOrdersInProgressAllUsers)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Basket routers', 'BasketRouter')
}

export default router
