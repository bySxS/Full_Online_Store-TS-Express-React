import { Router } from 'express'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import ApiError from '../apiError'
import ProductsController from './products.controller'
import { validateId } from '../users/users.validator'

const router = Router()

try {
  router.post('/add', AuthMiddleware, ProductsController.add)
  router.delete('/delete/:id', RoleMiddleware(['admin']), ProductsController.deleteById)
  router.put('/update/:id', RoleMiddleware(['admin']), ProductsController.updateById)
  router.get('/search', ProductsController.search)
  router.get('/all', ProductsController.getAll)
  router.get('/:id', validateId, ProductsController.getById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'ProductsRouter')
}

export default router
