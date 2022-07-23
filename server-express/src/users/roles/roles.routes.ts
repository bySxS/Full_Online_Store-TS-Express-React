import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import RolesController from './roles.controller'
import ApiError from '@/apiError'
import { validateLogin } from './roles.validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  // success
  router.post('/add',
    validateLogin(), ValidatorResultMiddleware,
    RoleMiddleware('admin'),
    RolesController.AddRole)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Roles routers', 'UsersRouter')
}

export default router
