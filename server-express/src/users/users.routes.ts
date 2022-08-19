import { Router } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import {
  validateLink,
  validateLogin,
  validateRegistration,
  validateUpdUser
} from './users.validator'
import ApiError from '@/apiError'
import {
  validateId,
  validateLimitPage,
  validateSearch
} from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  // success
  router.post('/registration',
    validateRegistration(), ValidatorResultMiddleware,
    UsersController.registration)
  // success
  router.post('/login',
    validateLogin(), ValidatorResultMiddleware,
    UsersController.login)
  // success
  router.get('/logout',
    AuthMiddleware,
    UsersController.logout)
  // success
  router.get('/activate/:link',
    validateLink(), ValidatorResultMiddleware,
    AuthMiddleware,
    UsersController.activate)
  // success
  router.get('/refresh',
    UsersController.refresh)
  // success
  router.get('/search',
    validateLimitPage(), validateSearch(), ValidatorResultMiddleware,
    UsersController.searchUsers)
  // success
  router.get('/all',
    validateLimitPage(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    UsersController.getUsers)
  // success
  router.get('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    UsersController.getUserById)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    UsersController.deleteUserById)
  // success
  router.put('/:id',
    validateId(), validateUpdUser(), ValidatorResultMiddleware,
    AuthMiddleware,
    UsersController.updateUserById)
  // success
  router.get('/',
    AuthMiddleware,
    UsersController.getAuthUser)
} catch (e) {
  throw ApiError.internalRequest(
    'Ошибка в Users routers', 'UsersRouter'
  )
}

export default router
