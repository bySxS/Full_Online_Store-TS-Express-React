import { Router } from 'express'
import { RoleMiddleware } from '@/middleware/role'
import { AuthMiddleware } from '@/middleware/auth'
import ApiError from '@/apiError'
import ProductsController from './products.controller'
import { validateId, validateLimitPage } from '@/validator'
import { validateProduct, validateProductUpd } from '@/products/products.validator'
import { ValidatorResultMiddleware } from '@/middleware/validatorResult'

const router = Router()

try {
  // success
  router.post('/',
    validateProduct(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.add)
  // success
  router.delete('/:id',
    validateId(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.deleteById)
  // success
  router.put('/:id',
    validateId(), validateProduct(), validateProductUpd(), ValidatorResultMiddleware,
    RoleMiddleware(['admin']),
    ProductsController.updateById)
  // success
  router.get('/search',
    validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.search)
  // success
  router.get('/:id',
    validateId(), ValidatorResultMiddleware,
    ProductsController.getById)
  // success
  router.get('/',
    validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.getAll)
  // success
  router.get('/category/:id',
    validateId(), validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.getAllByCategoryId)
  // success
  router.get('/characteristic/:id',
    validateId(), validateLimitPage(), ValidatorResultMiddleware,
    ProductsController.getAllByCharacteristicsId)
} catch (e) {
  throw ApiError.internalRequest('Ошибка в Products routers', 'ProductsRouter')
}

export default router
