import { Router } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import { validateLogin, validateRegistration } from './users.validator'
import ApiError from '@/apiError'
import { validateId, validateLimitPage } from '@/validator'

const router = Router()

try {
  router.post('/registration', validateRegistration(), UsersController.registration)
  router.post('/login', validateLogin(), UsersController.login)
  router.post('/logout', AuthMiddleware, UsersController.logout)
  router.get('/activate/:link', UsersController.activate)
  router.get('/refresh', UsersController.refresh)
  router.get('/all', validateLimitPage(), UsersController.getUsers)
  router.delete('/delete/:id', validateId(), RoleMiddleware(['admin']), UsersController.deleteUserById)
  router.put('/update/:id', validateId(), AuthMiddleware, UsersController.updateUserById)
  router.get('/search', validateLimitPage(), UsersController.searchUsers)
  router.get('/:id', validateId(), UsersController.getUserById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Users routers', 'UsersRouter')
}

export default router
