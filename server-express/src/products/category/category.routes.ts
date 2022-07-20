import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import { validateId } from '@/users/users.validator'
import CategoryController from '@/products/category/category.controller'

const router = Router()

try {
  router.post('/add', validateId, RoleMiddleware(['admin']), CategoryController.add)
  router.put('/:id', validateId, RoleMiddleware(['admin']), CategoryController.upd)
  router.delete('/:id', validateId, RoleMiddleware(['admin']), CategoryController.del)
  router.get('/all', CategoryController.getAll)
  router.get('/search', CategoryController.search)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Category routers', 'CategoryRouter')
}

export default router
