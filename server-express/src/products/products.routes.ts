import { Router } from 'express'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import ApiError from '../apiError'
import ProductsController from './products.controller'

const router = Router()

try {
  router.post('/add', AuthMiddleware, ProductsController.add)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'UsersRouter')
}

export default router
