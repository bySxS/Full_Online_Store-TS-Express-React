import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import ProductsController from './products.controller'
import { validateId, validateLimitPage } from '@/validator'
import { validateProduct } from '@/products/products.validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  router.post('/add',
    validateProduct(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.add)
  router.delete('/delete/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.deleteById)
  router.put('/update/:id',
    validateId(), validateProduct(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.updateById)
  router.get('/search',
    validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.search)
  router.get('/:id',
    validateId(), ValidatorResultMiddleware,
    ProductsController.getById)
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.getAll)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'ProductsRouter')
}

export default router
