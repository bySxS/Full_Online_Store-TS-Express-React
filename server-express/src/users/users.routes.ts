import { Router } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import { validateLink, validateLogin, validateRegistration } from './users.validator'
import ApiError from '@/apiError'
import { validateId, validateLimitPage, validateSearch } from '@/validator'
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
  router.post('/logout',
    AuthMiddleware,
    UsersController.logout)
  // success
  router.get('/activate/:link',
    validateLink(), ValidatorResultMiddleware,
    UsersController.activate)
  // success
  router.get('/refresh',
    UsersController.refresh)
  // success
  router.delete('/delete/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    UsersController.deleteUserById)
  // success
  router.put('/update/:id',
    validateId(), validateRegistration(), ValidatorResultMiddleware,
    AuthMiddleware,
    UsersController.updateUserById)
  // success
  router.get('/search',
    validateLimitPage(), validateSearch(), ValidatorResultMiddleware,
    UsersController.searchUsers)
  // success
  router.get('/:id',
    validateId(), ValidatorResultMiddleware,
    UsersController.getUserById)
  // success
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    UsersController.getUsers)
} catch (e) {
  throw ApiError.internalRequest(
    'Ошибка в Users routers', 'UsersRouter'
  )
}

export default router
