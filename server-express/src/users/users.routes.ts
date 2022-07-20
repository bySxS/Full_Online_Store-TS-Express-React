import { Router } from 'express'
import UsersController from './users.controller'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import { validateRegistration } from './users.validator'
import ApiError from '@/apiError'

const router = Router()

try {
  router.post('/registration', validateRegistration(), UsersController.registration)
  router.post('/login', UsersController.login)
  router.post('/logout', UsersController.logout)
  router.get('/activate/:link', UsersController.activate)
  router.get('/refresh', UsersController.refresh)
  router.get('/all', UsersController.getUsers)
  router.delete('/delete/:id', RoleMiddleware(['admin']), UsersController.deleteUserById)
  router.put('/update/:id', AuthMiddleware, UsersController.updateUserById)
  router.get('/search', UsersController.searchUsers)
  router.get('/:id', UsersController.getUserById)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Users routers', 'UsersRouter')
}

export default router
