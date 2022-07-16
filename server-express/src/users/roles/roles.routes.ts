import { Router } from 'express'
import { RoleMiddleware } from '../../middleware/role'
import RolesController from './roles.controller'
import ApiError from '../../apiError'

const router = Router()

try {
  router.post('/add_role', RoleMiddleware('admin'), RolesController.AddRole)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Roles routers', 'UsersRouter')
}

export default router
