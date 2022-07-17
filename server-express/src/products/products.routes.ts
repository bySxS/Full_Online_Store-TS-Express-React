import { Router } from 'express'
import { RoleMiddleware } from '../middleware/role'
import { AuthMiddleware } from '../middleware/auth'
import ApiError from '../apiError'
import ProductsController from './products.controller'
import { validateId } from '../users/users.validator'
import UsersController from '../users/users.controller'

const router = Router()

try {
  router.post('/add', RoleMiddleware(['admin']), ProductsController.add)
  router.delete('/delete/:id', RoleMiddleware(['admin']), ProductsController.deleteById)
  router.put('/update/:id', RoleMiddleware(['admin']), ProductsController.updateById)
  router.get('/search', ProductsController.search)
  router.get('/:id', validateId(), ProductsController.getById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'UsersRouter')
}

export default router
