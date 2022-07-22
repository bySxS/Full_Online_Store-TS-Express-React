import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
// import { AuthMiddleware } from 'middleware/auth'
import ApiError from '@/apiError'
import CategoryController from '@/products/category/category.controller'
import { validateId, validateLimitPage, validateSearch } from '@/validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'
import { validateCategory } from '@/products/category/category.validator'

const router = Router()

try {
  // success
  router.post('/add',
    validateCategory(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CategoryController.add)
  // success
  router.put('/:id',
    validateId(), validateCategory(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CategoryController.upd)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    CategoryController.del)
  // success
  router.get('/search',
    validateLimitPage(), validateSearch(), ValidatorResultMiddleware,
    CategoryController.search)
  // success
  router.get('/',
    CategoryController.getAll)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Category routers', 'CategoryRouter')
}

export default router
